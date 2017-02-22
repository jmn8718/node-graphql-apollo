import User, { getUserByUsername, addUser, deleteUser } from '../models/user';
import Place, { addPlace, getPlaceById } from '../models/place';
import { createToken, comparePassword, verifyToken } from '../utils';

const resolveFunctions = {
  Query: {
    User(root, args) {
      return new Promise((resolve, reject) => {
        getUserByUsername(args.username, (err, user) => {
          if (err) {
            reject(err);
          }
          resolve(user);
        });
      });
    },
    Users() {
      return new Promise((resolve, reject) => {
        User.find({}, (err, users) => {
          if (err) {
            reject(err);
          }
          resolve(users);
        });
      });
    },
    Place(roots, args) {
      return new Promise((resolve, reject) => {
        getPlaceById(args.id, (err, place) => {
          if (err) {
            reject(err);
          }
          resolve(place);
        });
      });
    },
    allPlaces() {
      return new Promise((resolve, reject) => {
        Place.find({}, (err, users) => {
          if (err) {
            reject(err);
          }
          resolve(users);
        });
      });
    },
  },
  Mutation: {
    createUser(root, args) {
      const newUser = new User(args.user);
      return new Promise((resolve, reject) => {
        addUser(newUser, (err, user) => {
          if (err) {
            reject(err);
          }
          resolve(user);
        });
      });
    },
    deleteUser(root, args, context) {
      if (!context.token) {
        return new Error('No token provided');
      }
      return new Promise((resolve, reject) => {
        verifyToken(context.token, (err, decoded) => {
          if (err) {
            reject(err);
          } else if (decoded.username === args.username) {
            deleteUser(args.username, (err2, user) => {
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
    authenticateUser(root, args) {
      return new Promise((resolve, reject) => {
        getUserByUsername(args.username, (err, user) => {
          if (err) {
            reject(err);
          }
          comparePassword(args.password, user.password, (err2, isMatch) => {
            if (err2) {
              reject(err2);
            }
            if (!isMatch) {
              reject(new Error('Wrong password'));
            }
            resolve({
              access_token: createToken(user),
              token_type: 'jwt',
              expires_in: process.env.EXPIRES_IN,
              user,
            });
          });
        });
      });
    },
    createPlace(root, args, context) {
      if (!context.token) {
        return new Error('No token provided');
      }
      return new Promise((resolve, reject) => {
        verifyToken(context.token, (err, decoded) => {
          if (err) {
            reject(err);
          }
          getUserByUsername(decoded.username, (err2, user) => {
            if (err2) {
              reject(err2);
            }
            const newPlace = new Place(args.place);
            newPlace.user = user;
            addPlace(newPlace, (err3, place) => {
              if (err3) {
                reject(err3);
              }
              resolve(place);
            });
          });
        });
      });
    },
  },
};

export default resolveFunctions;
