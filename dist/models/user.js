'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUser = exports.addUser = exports.getUserByUsername = exports.getUserById = exports.UserSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _isEmail = require('validator/lib/isEmail');

var _isEmail2 = _interopRequireDefault(_isEmail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Use bluebird
_mongoose2.default.Promise = require('bluebird');

// User Schema
var UserSchema = exports.UserSchema = _mongoose2.default.Schema({
  name: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [_isEmail2.default, 'Invalid email'],
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
});

var User = _mongoose2.default.model('User', UserSchema);

exports.default = User;
var getUserById = exports.getUserById = function getUserById(id, callback) {
  User.findById(id, callback);
};

var getUserByUsername = exports.getUserByUsername = function getUserByUsername(username, callback) {
  var query = {
    username: username
  };
  User.findOne(query, callback);
};

var addUser = exports.addUser = function addUser(newUser, callback) {
  _bcryptjs2.default.genSalt(10, function (err, salt) {
    if (err) {
      callback(err);
    }
    _bcryptjs2.default.hash(newUser.password, salt, function (err2, hash) {
      if (err2) {
        callback(err2);
      }
      newUser.password = hash; // eslint-disable-line no-param-reassign
      newUser.save(callback);
    });
  });
};

var deleteUser = exports.deleteUser = function deleteUser(username, callback) {
  var query = {
    username: username
  };
  User.findOne(query, function (err, user) {
    if (err) {
      callback(err);
    }
    if (user) {
      user.remove(function (err2) {
        if (err2) {
          callback(err2);
        }
        callback(err2, user);
      });
    } else {
      callback(new Error('User not found'));
    }
  });
};
//# sourceMappingURL=user.js.map