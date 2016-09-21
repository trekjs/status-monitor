'use strict'

const { readFileSync } = require('fs')
const { join } = require('path')
const onHeaders = require('on-headers')
const validate = require('./lib/validate')
const onHeadersListener = require('./lib/on-headers-listener')
const socketIoInit = require('./lib/socket-io-init')

module.exports = main

function main (config) {
  config = validate(config)

  const staticPath = join(__dirname, 'static')
  const renderedHtml =
    readFileSync(join(staticPath, 'index.html'), { encoding: 'utf8' })
      .replace(/{{title}}/g, config.title)
      .replace(/{{script}}/g, readFileSync(join(staticPath, 'app.js')))
      .replace(/{{style}}/g, readFileSync(join(staticPath, 'style.css')))

  return {
    config,

    get path () {
      return config.path
    },

    middleware ({ rawReq, rawRes }, next) {
      const startTime = process.hrtime()
      socketIoInit(rawReq.socket.server, config.spans)
      onHeaders(rawRes, () => {
        onHeadersListener(rawRes.statusCode, startTime, config.spans)
      })
      return next()
    },

    page ({ rawRes }) {
      rawRes.end(renderedHtml)
    }
  }
}
