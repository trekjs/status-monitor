# trek-status-monitor
Simple, self-hosted module based on Socket.io and Chart.js to report realtime server metrics for Trek-based node servers.

Forked from [express-status-monitor](https://github.com/RafalWilinski/express-status-monitor).

![Monitoring Page](http://i.imgur.com/AHizEWq.gif "Monitoring Page")


## Installation

```
$ npm install trek-status-monitor --save
```


## Example

```js
const Engine = require('trek-engine')

// setups & configs status monitor.
const statusMonitor = require('trek-status-monitor')({
  title: 'Trek Status',
  path: '/status'
})

const app = new Engine()

// registers status monitor's middleware
app.use(statusMonitor.middleware)

app.use(({ req, res, rawRes }) => {
  // registers status monitor's page route, defaults to `/status`
  if (req.path === statusMonitor.path) {
    return statusMonitor.page({ rawRes })
  }
  res.end('Hello world')
})

app.run(3000, () => {
  console.log('listening on http://0.0.0.0:3000')
})
```

```
$ npm i
$ node examples/index.js
$ open http://0.0.0.0:3000/status
```


### APIs

* **config**: *Object*

  Monitor can be configured by passing options object into `statusMonitor` constructor.

  Default config:
  ```js
  {
    title: 'Trek Status',     // Default title
    path: '/status',
    spans: [{
      interval: 1,            // Every second
      retention: 60           // Keep 60 datapoints in memory
    }, {
      interval: 5,            // Every 5 seconds
      retention: 60
    }, {
      interval: 15,           // Every 15 seconds
      retention: 60
    }]
  }
  ```

* **path**: *String*

  Alias to `config.path`, defaults to `/status`.

* **middleware**: *Function*

  The Trek's middleware.

  `app.use(statusMonitor.middleware)`

* **page**: *Function*

  The Trek's middleware, but using for the special route.

  `router.get(statusMonitor.path, statusMonitor.page)`


## Badges

[![Build Status](https://travis-ci.org/trekjs/status-monitor.svg?branch=master)](https://travis-ci.org/trekjs/status-monitor)
[![codecov](https://codecov.io/gh/trekjs/status-monitor/branch/master/graph/badge.svg)](https://codecov.io/gh/trekjs/status-monitor)
![](https://img.shields.io/badge/license-MIT-blue.svg)

---

> [fundon.me](https://fundon.me) &nbsp;&middot;&nbsp;
> GitHub [@fundon](https://github.com/fundon) &nbsp;&middot;&nbsp;
> Twitter [@_fundon](https://twitter.com/_fundon)
