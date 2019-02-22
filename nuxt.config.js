const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */

  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ] /*
    script: [
      { src: 'https://aframe.io/releases/0.6.1/aframe.min.js' },
      {
        src: 'https://jeromeetienne.github.io/AR.js/aframe/build/aframe-ar.js'
      },
      //three.js library
      { src: '../js/three.js/build/three.min.js' },
      { src: '../js/three.js/examples/js/libs/dat.gui.min.js' },
      //tracking.js library
      { src: '../js/vendor/tracking.js/build/tracking.js' },
      { src: '../js/vendor/tracking.js/build/data/face-min.js' },
      {
        src: '../js/vendor/tracking.js/src/alignment/training/Landmarks.js'
      },
      {
        src: '../js/vendor/tracking.js/src/alignment/training/Regressor.js'
      },
      //include local tracking.js utils
      { src: '../js/js/tracking-lbf-debug.js' },
      { src: '../js/js/tracking-lbf-landmark-features.js' },
      { src: '../js/js/tracking-lbf-landmarks-smoother.js' },
      { src: '../js/hoge.js' }
    ]*/
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css', '@/assets/scss/app.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/element-ui'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    ['@nuxtjs/pwa', { icon: true }]
  ],

  bootstrapVue: {
    bootstrapCSS: false, // or `css`
    bootstrapVueCSS: false // or `bvCSS`
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  workbox: {
    dev: true
  },
  manifest: {
    name: 'C-AR-D.app',
    lang: 'ja'
  },

  /*
   ** Build configuration
   */
  build: {
    /*
    vendor: ['~assets/three.js/build/three.min.js'],
    vendor: ['~assets/three.js/examples/js/libs/dat.gui.min.js'],
    vendor: ['~assets/vendor/tracking.js/build/tracking.js'],
    vendor: ['~assets/vendor/tracking.js/build/data/face-min.js'],
    vendor: [
      '~assets/vendor/tracking.js/src/alignment/training/Landmarks.js'
    ],
    vendor: [
      '~assets/vendor/tracking.js/src/alignment/training/Regressor.js'
    ],
    vendor: ['~assets/js/tracking-lbf-debug.js'],
    vendor: ['~assets/tracking-lbf-landmark-features.js'],
    vendor: ['~assets/tracking-lbf-landmarks-smoother.js'],
    */
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
