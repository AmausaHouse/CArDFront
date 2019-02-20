<template>
  <section class="container">
    <video id="video" width="100%" height="100%" preload autoplay loop muted />
    <canvas id="canvas" class="" width="100%" height="100%"     />
  </section>
</template>
<script   >
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
    var tracker = new tracking.ObjectTracker('face')
    tracker.setInitialScale(4)
    tracker.setStepSize(2)
    tracker.setEdgesDensity(0.1)
    ctx.strokeStyle = '#a64ceb'
    tracking.track('#video', tracker, { camera: true })
    tracker.on('track', function(event) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      event.data.forEach(function(rect) {
        ctx.strokeRect(rect.x, rect.y, rect.width, rect.height)
        // ここでカッコいい感じの枠をhtml5-canvasで書く
      })
    })
  }
}
</script>
<style scoped>
video,
canvas {
  margin-left: 0px;
  margin-top: 0px;
  position: absolute;
}
</style>
