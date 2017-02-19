import User, { getUserByUsername, addUser, deleteUser } from '../models/user';
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
    Users(root, args) {
      return new Promise((resolve, reject) => {
        User.find({}, (err, users) => {
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
      const newUser = new User(args);
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
      return new Promise((resolve, reject) => {
        verifyToken(args.token, (err, decoded) => {
          console.log(err, decoded)
          if (err) {
            reject(err);
          } else if (decoded.username === args.username) {
            deleteUser(args.username, (err, user) => {
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
    authenticateUser(root, args) {
      return new Promise((resolve, reject) => {
        getUserByUsername(args.username, (err, user) => {
          if (err) {
            reject(err);
          }
          comparePassword(args.password, user.password, (err, isMatch) => {
            if (err) {
              reject(err);
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
    }
  },
};

export default resolveFunctions;
