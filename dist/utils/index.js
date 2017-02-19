'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.comparePassword = exports.createToken = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EXPIRES_IN = parseInt(process.env.EXPIRES_IN) || 3600;

var createToken = exports.createToken = function createToken(user) {
  return _jsonwebtoken2.default.sign({
    id: user._id, // eslint-disable-line no-underscore-dangle
    username: user.username
  }, process.env.SECRET, {
    expiresIn: EXPIRES_IN
  });
};

var comparePassword = exports.comparePassword = function comparePassword(candidatePassword, hash, callback) {
  _bcryptjs2.default.compare(candidatePassword, hash, callback);
};

var verifyToken = exports.verifyToken = function verifyToken(token, callback) {
  _jsonwebtoken2.default.verify(token, process.env.SECRET, callback);
};
//# sourceMappingURL=index.js.map