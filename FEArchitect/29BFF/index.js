const gateway = require('./lucas-gateway');
const server = gateway({
  routes: [{
    prefix: '/service',
    target: 'http://127.0.0.1:3000'
  }]
})
server.start(8080)