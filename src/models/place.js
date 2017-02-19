import mongoose from 'mongoose';
import { UserSchema } from './user';

// Use bluebird
mongoose.Promise = require('bluebird');

// Place Schema
const PlaceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  label: {
    type: String,
    default: '',
  },
  location: {
    lat: {
      type: Number,
      min: -90,
      max: 90,
      default: 0,
    },
    lng: {
      type: Number,
      min: -180,
      max: 180,
      default: 0,
    },
  },
  creator: UserSchema,
}, {
  timestamps: true,
});

const Place = mongoose.model('Place', PlaceSchema);

export default Place;

export const addPlace = (newPlace, callback) => {
  newPlace.save(callback);
};

export const getPlaceById = (id, callback) => {
  Place.findById(id, callback);
};
