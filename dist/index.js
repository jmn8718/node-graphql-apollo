'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create HTTP server.
 */

var server = _http2.default.createServer(_server2.default);

/**
 * Listen on provided port, on all network interfaces.
 */
var port = _server2.default.get('port');
server.listen(port);
server.on('error', function (error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', function () {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'Pipe ' + port : 'Port ' + port;
  console.log(bind);
  console.log('Listening on port: ' + _server2.default.get('port'));
});
//# sourceMappingURL=index.js.map