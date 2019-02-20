const https = require('https')
const fs = require('fs')
const { Nuxt, Builder } = require('nuxt')
const isProd = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 8443

// Nuxt.js setup
let config = require('./nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)
if (!isProd) {
  new Builder(nuxt).build()
}

// HTTPS Server
const options = {
  key: fs.readFileSync('./.self-signed-certificate/server.key'),
  cert: fs.readFileSync('./.self-signed-certificate/server.crt')
}

// Create the server
https.createServer(options, nuxt.render).listen(port)

console.log(`Server listening on https://localhost:${port}`)
