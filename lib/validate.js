'use strict'

const defaultConfig = require('./default-config')

module.exports = (config) => {
  if (!config) {
    return defaultConfig
  }

  const { title, path, spans } = config

  if ('string' !== typeof title) {
    config.title = defaultConfig.title
  }

  if ('string' !== typeof path) {
    config.path = defaultConfig.path
  }

  if ('object' !== typeof spans) {
    config.spans = defaultConfig.spans
  }

  return config
}
