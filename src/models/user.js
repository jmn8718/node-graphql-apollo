import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import isEmail from 'validator/lib/isEmail';

// Use bluebird
mongoose.Promise = require('bluebird');

// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [ isEmail, 'Invalid email'],
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

const User = mongoose.model('User', UserSchema);

export default User;

export const getUserById = (id, callback) => {
  User.findById(id, callback);
}

export const getUserByUsername = (username, callback) => {
  const query = {
    username: username,
  };
  User.findOne(query, callback);
}

export const addUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        throw err;
      }
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

export const deleteUser = (username, callback) => {
  const query = {
    username: username,
  };
  User.findOne(query, (err, user) => {
    if (err) {
      callback(err);
    }
    if (user) {
      user.remove((err, result) => {
        if (err) {
          callback(err);
        }
        console.log(result);
        callback(err, user);
      });
    } else {
      callback(new Error('User not found'));
    }
  });
}
