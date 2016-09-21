/* eslint no-console: "off" */

const Engine = require('trek-engine')

const app = new Engine()

const statusMonitor = require('../index')(require('../lib/default-config'))

app.use(statusMonitor.middleware)

app.use(({ req, res, rawRes }) => {
  if (req.path === statusMonitor.path) {
    return statusMonitor.page({ rawRes })
  }
  res.end('Hello world')
})

app.run(3000, () => {
  console.log('listening on http://0.0.0.0:3000')
})
