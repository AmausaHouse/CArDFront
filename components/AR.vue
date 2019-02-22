<template>
  <section class="container">
    <video id="video" width="100%" height="100%" preload autoplay loop muted />
    <canvas id="canvas" class="" width="100%" height="100%" />
    <div class="overlay">
      <b-button variant="primary" @click="showModal">
        take a phototake
      </b-button>
    </div>
    <div>
      <b-modal ref="myModalRef" hide-footer title="take a photo">
        <div class="d-block text-center">
          画像
        </div>
        <b-button
          class="mt-3"
          variant="outline-danger"
          block
          @click="hideModal"
        >
          閉じる
        </b-button>
      </b-modal>
    </div>
  </section>
</template>
<script>
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
  mounted() {
    var video = document.getElementById('video')
    var canvas = document.getElementById('canvas')
    canvas.width = document.body.clientWidth
    canvas.height = document.body.clientHeight
    video.width = document.body.clientWidth
    video.height = document.body.clientHeight
    var ctx = canvas.getContext('2d')
    var img = new Image()
    //img path
    img.src = 'img/hoge.png'
    var tracker = new tracking.ObjectTracker('face')
    tracker.setInitialScale(4)
    tracker.setStepSize(2)
    tracker.setEdgesDensity(0.1)
    ctx.fillStyle = 'rgba(91, 15, 81, 0.7)'
    ctx.strokeStyle = 'blue'
    tracking.track('#video', tracker, { camera: true })
    tracker.on('track', function(event) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      event.data.forEach(function(rect) {
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height)
        ctx.fillRect(rect.x, rect.y - rect.height / 2, rect.width, rect.height)
        ctx.font = rect.x / 4
        ctx.strokeText(
          'name',
          rect.x + rect.width / 2,
          rect.y - (rect.height / 2 / 3) * 2,
          rect.width,
          rect.height
        )
        ctx.strokeText(
          'fuga',
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
      })
    })
  },
  methods: {
    showModal() {
      this.$refs.myModalRef.show()
    },
    hideModal() {
      this.$refs.myModalRef.hide()
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
