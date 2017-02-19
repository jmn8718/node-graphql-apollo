'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolveFunctions = {
  Query: {
    User: function User(root, args) {
      return new Promise(function (resolve, reject) {
        (0, _user.getUserByUsername)(args.username, function (err, user) {
          if (err) {
            reject(err);
          }
          resolve(user);
        });
      });
    },
    Users: function Users(root, args) {
      return new Promise(function (resolve, reject) {
        _user2.default.find({}, function (err, users) {
          if (err) {
            reject(err);
          }
          resolve(users);
        });
      });
    }
  },
  Mutation: {
    createUser: function createUser(root, args) {
      var newUser = new _user2.default(args);
      return new Promise(function (resolve, reject) {
        (0, _user.addUser)(newUser, function (err, user) {
          if (err) {
            reject(err);
          }
          resolve(user);
        });
      });
    },
    deleteUser: function deleteUser(root, args, context) {
      return new Promise(function (resolve, reject) {
        (0, _utils.verifyToken)(args.token, function (err, decoded) {
          console.log(err, decoded);
          if (err) {
            reject(err);
          } else if (decoded.username === args.username) {
            (0, _user.deleteUser)(args.username, function (err, user) {
              console.log(err, user);
              if (err) {
                reject(err);
              }
              resolve(user);
            });
          } else {
            reject(new Error('Unauthorized operation'));
          }
        });
      });
    },
    authenticateUser: function authenticateUser(root, args) {
      return new Promise(function (resolve, reject) {
        (0, _user.getUserByUsername)(args.username, function (err, user) {
          if (err) {
            reject(err);
          }
          (0, _utils.comparePassword)(args.password, user.password, function (err, isMatch) {
            if (err) {
              reject(err);
            }
            if (!isMatch) {
              reject(new Error('Wrong password'));
            }
            resolve({
              access_token: (0, _utils.createToken)(user),
              token_type: 'jwt',
              expires_in: process.env.EXPIRES_IN,
              user: user
            });
          });
        });
      });
    }
  }
};

exports.default = resolveFunctions;
//# sourceMappingURL=resolvers.js.map