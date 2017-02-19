'use strict';

var mongoose = require('mongoose');

var DB = void 0;
if (process.env.ENV === 'development') {
  DB = 'mongodb://' + process.env.DB_ENDPOINT + ':' + process.env.DB_PORT + '/' + process.env.DB_COLLECTION;
} else {
  DB = 'mongodb://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_ENDPOINT + ':' + process.env.DB_PORT + '/' + process.env.DB_COLLECTION;
}

// Connect To Database
mongoose.connect(DB);

// On Connection
mongoose.connection.on('connected', function () {
  console.log('Connected to database ' + DB);
});

// On Error
mongoose.connection.on('error', function (err) {
  console.error('Database error: ' + err);
});

module.exports = mongoose;
//# sourceMappingURL=index.js.map