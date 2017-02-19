import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import uuid from 'node-uuid';

import {
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';

import { makeExecutableSchema } from 'graphql-tools';

import Schema from './data/schema';
import Resolvers from './data/resolvers';

import api from './api';

require('dotenv').config();
require('./db');


const app = express();

const PORT = process.env.PORT || 5000;
app.set('port', PORT);

if (process.env.ENV === 'development') {
  morgan.token('id', (req) => req.id);

  app.use((req, res, next) => {
    req.id = uuid.v4();
    next();
  });
  app.use(morgan(':id :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.ENV === 'development') {
  app.use(cors());
}

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
});

app.use('/graphql', graphqlExpress(request => ({
  schema: executableSchema,
  context: {
    user: (request.headers && request.headers.Authorization) || undefined,
  },
})));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.use('/api', api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (process.env.ENV === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
});

export default app;
