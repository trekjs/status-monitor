# trek-status-monitor
Simple, self-hosted module based on Socket.io and Chart.js to report realtime server metrics for Trek-based node servers.

Forked from [express-status-monitor](https://github.com/RafalWilinski/express-status-monitor).

![Monitoring Page](http://i.imgur.com/AHizEWq.gif "Monitoring Page")

## Installation & setup
1. Run `npm install trek-status-monitor --save`
2. Before any other middleware or router add following line:
`app.use(require('trek-status-monitor')());`
3. Run server and go to `/status`

## Run examples

2. Run `npm i`
3. Run server `node examples/index.js`
4. Go to `http://0.0.0.0:3000`

## Options

Monitor can be configured by passing options object into `trekMonitor` constructor.

Default config:
```javascript
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

```

## Badges

[![Build Status](https://travis-ci.org/trekjs/status-monitor.svg?branch=master)](https://travis-ci.org/trekjs/status-monitor)
[![codecov](https://codecov.io/gh/trekjs/status-monitor/branch/master/graph/badge.svg)](https://codecov.io/gh/trekjs/status-monitor)
![](https://img.shields.io/badge/license-MIT-blue.svg)

---

> [fundon.me](https://fundon.me) &nbsp;&middot;&nbsp;
> GitHub [@fundon](https://github.com/fundon) &nbsp;&middot;&nbsp;
> Twitter [@_fundon](https://twitter.com/_fundon)
