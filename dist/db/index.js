'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DB = void 0;
if (process.env.ENV === 'development') {
  DB = 'mongodb://' + process.env.DB_ENDPOINT + ':' + process.env.DB_PORT + '/' + process.env.DB_COLLECTION;
} else {
  DB = 'mongodb://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_ENDPOINT + ':' + process.env.DB_PORT + '/' + process.env.DB_COLLECTION;
}

// Connect To Database
_mongoose2.default.connect(DB);

// On Connection
_mongoose2.default.connection.on('connected', function () {
  console.log('Connected to database ' + DB); // eslint-disable-line no-console
});

// On Error
_mongoose2.default.connection.on('error', function (err) {
  console.error('Database error: ' + err); // eslint-disable-line no-console
});

module.exports = _mongoose2.default;
//# sourceMappingURL=index.js.map