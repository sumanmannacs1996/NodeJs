const http = require('http');
const routes = require('./routes');

console.log(routes.otherData);
const SERVER = http.createServer(routes.handler);

SERVER.listen(3000);