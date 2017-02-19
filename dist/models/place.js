'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPlaceById = exports.addPlace = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require('./user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Use bluebird
_mongoose2.default.Promise = require('bluebird');

// Place Schema
var PlaceSchema = _mongoose2.default.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  label: {
    type: String,
    default: ''
  },
  location: {
    lat: {
      type: Number,
      min: -90,
      max: 90,
      default: 0
    },
    lng: {
      type: Number,
      min: -180,
      max: 180,
      default: 0
    }
  },
  creator: _user.UserSchema
}, {
  timestamps: true
});

var Place = _mongoose2.default.model('Place', PlaceSchema);

exports.default = Place;
var addPlace = exports.addPlace = function addPlace(newPlace, callback) {
  newPlace.save(callback);
};

var getPlaceById = exports.getPlaceById = function getPlaceById(id, callback) {
  Place.findById(id, callback);
};
//# sourceMappingURL=place.js.map