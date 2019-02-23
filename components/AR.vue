<template>
  <section class="container">
    <video id="video" width="100%" height="100%" preload autoplay loop muted />
    <canvas id="canvas" class="" width="100%" height="100%" />
    <div class="overlay">
      <b-button variant="primary" @click="modalShow = !modalShow">
        take a photo
      </b-button>
    </div>
    <div>
      <b-modal v-model="modalShow" hide-footer>
        <div class="d-block text-center">
          <canvas
            id="canvas2"
            :width="width"
            :height="height"
            style="display:none"
          />
          <img id="data_url_png" :width="width / 3" :height="height / 3" />
        </div>
        <b-button variant="danger" @click="savePic()">保存</b-button>
      </b-modal>
    </div>
    <canvas
      id="tempcanvas"
      class=""
      width="100%"
      height="100%"
      style="display: none"
    />
  </section>
</template>
<script>
import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
export default {
  head: {
    script: [
      //three.js library
      //{ src: 'three.js/build/three.min.js' },
      //{ src: 'three.js/examples/js/libs/dat.gui.min.js' },
      //tracking.js library
      { src: 'vendor/tracking.js/build/tracking.js' },
      { src: 'vendor/tracking.js/build/data/face-min.js' }
      /*
      {
        src: 'vendor/tracking.js/src/alignment/training/Landmarks.js'
      },
      {
        src: 'vendor/tracking.js/src/alignment/training/Regressor.js'
      },
      //include local tracking.js utils
      { src: '/js/tracking-lbf-debug.js' },
      { src: '/js/tracking-lbf-landmark-features.js' },
      { src: '/js/tracking-lbf-landmarks-smoother.js' }
      */
    ]
  },
  data() {
    return {
      modalShow: false,
      width: 0,
      height: 0,
      imgSrc: null,
      video: {},
      videoWidth: 0,
      videoHeight: 0,
      faceinfo: {
        name: 'thsis your name',
        icon:
          'https://vignette.wikia.nocookie.net/marsargo/images/5/52/Unknown.jpg',
        info: 'this is your disctiption'
      }
    }
  },
  watch: {
    modalShow: function() {
      if (this.modalShow === true) {
        video.pause()
        var canvas2 = document.getElementById('canvas2')
        canvas2.getContext('2d').drawImage(video, 0, 0, this.width, this.height)
        canvas2
          .getContext('2d')
          .drawImage(canvas, 0, 0, this.width, this.height)
        this.imgSrc = canvas2.toDataURL()
        document.getElementById('data_url_png').src = this.imgSrc
      } else video.play()
    }
  },
  mounted() {
    this.width = document.body.clientWidth
    this.height = document.body.clientHeight
    var video = document.getElementById('video')
    this.video = video
    var canvas = document.getElementById('canvas')
    this.videoWidth = document.body.clientWidth
    this.videoHeight = document.body.clientHeight
    canvas.width = this.videoWidth
    canvas.height = this.videoHeight
    video.width = document.body.clientWidth
    video.height = document.body.clientHeight
    var ctx = canvas.getContext('2d')
    var img = new Image()
    var tracker = new tracking.ObjectTracker('face')
    tracker.setInitialScale(4)
    tracker.setStepSize(2)
    tracker.setEdgesDensity(0.1)
    ctx.fillStyle = 'rgba(91, 15, 81, 0.7)'
    ctx.strokeStyle = 'black'
    tracking.track('#video', tracker, { camera: true })
    tracker.on('track', event => {
      let name = this.faceinfo.name
      let info = this.faceinfo.info
      img.src = this.faceinfo.icon
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      event.data.forEach(function(rect) {
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height)
        ctx.fillRect(rect.x, rect.y - rect.height / 2, rect.width, rect.height)
        ctx.font = '30px'
        ctx.strokeText(
          name,
          rect.x + rect.width / 2,
          rect.y - (rect.height / 2 / 3) * 2,
          rect.width,
          rect.height
        )
        ctx.strokeText(
          info,
          rect.x + rect.width / 2,
          rect.y - (rect.height / 2 / 3) * 1,
          rect.width,
          rect.height
        )
        ctx.clearRect(
          rect.x + 10,
          rect.y + 10,
          rect.width - 20,
          rect.height - 20
        )
        ctx.drawImage(
          img,
          rect.x,
          rect.y - rect.height / 2,
          rect.width / 2,
          rect.height / 2
        )
        img.crossOrigin = 'anonymous'
      })
    })
    setInterval(() => this.uploadImage(), 5000)
  },
  methods: {
    savePic() {
      var date = new Date()
      var fileName = 'card-' + Math.round(date.getTime() / 1000) + '.png'
      var blob = this.base64toBlob(this.imgSrc)
      this.saveBlob(blob, fileName)
    },
    base64toBlob(base64) {
      var tmp = base64.split(',')
      var data = atob(tmp[1])
      var mime = tmp[0].split(':')[1].split(';')[0]
      var buf = new Uint8Array(data.length)
      for (var i = 0; i < data.length; i++) {
        buf[i] = data.charCodeAt(i)
      }
      var blob = new Blob([buf], { type: mime })
      return blob
    },
    saveBlob(blob, fileName) {
      var link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = fileName
      link.click()
    },
    uploadImage: function() {
      var canvas = document.getElementById('tempcanvas')
      canvas.setAttribute('width', this.videoWidth / 3)
      canvas.setAttribute('height', this.videoHeight / 3)
      var ctx = canvas.getContext('2d')
      ctx.drawImage(this.video, 0, 0, this.videoWidth / 3, this.videoHeight / 3)
      var b64Text = canvas.toDataURL()
      axios
        .post('/api/face/', {
          base64img: b64Text
        })
        .then(r => {
          if (r.data.length > 0) {
            this.faceinfo.name = r.data[0].display_name
            this.faceinfo.icon = r.data[0].user_icon
            this.faceinfo.info = r.data[0].user_dictionaly
            console.log(this.faceinfo)
          }
        })
    }
  }
}
</script>
<style scoped>
.overlay {
  position: absolute;
  top: 90%;
  left: 80%;
}
video,
canvas {
  margin-left: 0px;
  margin-top: 0px;
  position: absolute;
}
</style>
