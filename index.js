'use strict'

const { readFileSync } = require('fs')
const { join } = require('path')
const onHeaders = require('on-headers')
const validate = require('./lib/validate')
const onHeadersListener = require('./lib/on-headers-listener')
const socketIoInit = require('./lib/socket-io-init')

const staticPath = join(__dirname, 'static')

const middlewareWrapper = (config) => {
  config = validate(config);

  const renderedHtml =
    readFileSync(join(staticPath, 'index.html'), { encoding: 'utf8' })
      .replace(/{{title}}/g, config.title)
      .replace(/{{script}}/g, readFileSync(join(staticPath, 'app.js')))
      .replace(/{{style}}/g, readFileSync(join(staticPath, 'style.css')))

  return ({ req, rawRes }, next) => {
    socketIoInit(req.socket.server, config.spans)

    const startTime = process.hrtime()
    if (req.path === config.path) {
      rawRes.end(renderedHtml)
    } else {
      onHeaders(rawRes, () => { onHeadersListener(rawRes.statusCode, startTime, config.spans) })
      return next()
    }
  }
}

module.exports = middlewareWrapper
