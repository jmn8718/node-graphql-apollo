'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _place = require('../models/place');

var _place2 = _interopRequireDefault(_place);

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
    Users: function Users() {
      return new Promise(function (resolve, reject) {
        _user2.default.find({}, function (err, users) {
          if (err) {
            reject(err);
          }
          resolve(users);
        });
      });
    },
    Place: function Place(roots, args) {
      return new Promise(function (resolve, reject) {
        (0, _place.getPlaceById)(args.id, function (err, place) {
          if (err) {
            reject(err);
          }
          resolve(place);
        });
      });
    },
    Places: function Places() {
      return new Promise(function (resolve, reject) {
        _place2.default.find({}, function (err, users) {
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
      if (!context.token) {
        return new Error('No token provided');
      }
      return new Promise(function (resolve, reject) {
        (0, _utils.verifyToken)(context.token, function (err, decoded) {
          if (err) {
            reject(err);
          } else if (decoded.username === args.username) {
            (0, _user.deleteUser)(args.username, function (err2, user) {
              if (err2) {
                reject(err2);
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
          (0, _utils.comparePassword)(args.password, user.password, function (err2, isMatch) {
            if (err2) {
              reject(err2);
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
    },
    createPlace: function createPlace(root, args, context) {
      if (!context.token) {
        return new Error('No token provided');
      }
      return new Promise(function (resolve, reject) {
        (0, _utils.verifyToken)(context.token, function (err, decoded) {
          if (err) {
            reject(err);
          }
          (0, _user.getUserByUsername)(decoded.username, function (err2, user) {
            if (err2) {
              reject(err2);
            }
            var newPlace = new _place2.default(args);
            newPlace.location = {
              lat: args.lat || 0,
              lng: args.lng || 0
            };
            newPlace.user = user;
            (0, _place.addPlace)(newPlace, function (err3, place) {
              if (err3) {
                reject(err3);
              }
              resolve(place);
            });
          });
        });
      });
    }
  }
};

exports.default = resolveFunctions;
//# sourceMappingURL=resolvers.js.map