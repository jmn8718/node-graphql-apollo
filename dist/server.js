'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _graphqlServerExpress = require('graphql-server-express');

var _graphqlTools = require('graphql-tools');

var _schema = require('./data/schema');

var _schema2 = _interopRequireDefault(_schema);

var _resolvers = require('./data/resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();
require('./db');

var app = (0, _express2.default)();

var PORT = process.env.PORT || 5000;
app.set('port', PORT);

if (process.env.ENV === 'development') {
  _morgan2.default.token('id', function (req) {
    return req.id;
  });

  app.use(function (req, res, next) {
    req.id = _nodeUuid2.default.v4();
    next();
  });
  app.use((0, _morgan2.default)(':id :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'));
}

// parse body params and attache them to req.body
app.use(_bodyParser2.default.json({}));
app.use(_bodyParser2.default.urlencoded({ extended: true }));

if (process.env.ENV === 'development') {
  app.use((0, _cors2.default)());
}

var executableSchema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: _schema2.default,
  resolvers: _resolvers2.default
});

app.use('/graphql', (0, _graphqlServerExpress.graphqlExpress)(function (request) {
  return {
    schema: executableSchema,
    context: {
      user: request.headers && request.headers.Authorization || undefined
    }
  };
}));

app.use('/graphiql', (0, _graphqlServerExpress.graphiqlExpress)({
  endpointURL: '/graphql'
}));

app.use('/api', _api2.default);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (process.env.ENV === 'development') {
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.json({
    message: err.message
  });
});

exports.default = app;
//# sourceMappingURL=server.js.map