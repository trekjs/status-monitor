/* eslint no-console: "off" */

const Engine = require('trek-engine');

const app = new Engine();

app.use(require('../index')(require('../lib/default-config')));

app.use(({ res }) => {
  res.end('Hello world')
})

app.run(3000, () => {
  console.log('listening on http://0.0.0.0:3000');
});
