import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const EXPIRES_IN = parseInt(process.env.EXPIRES_IN) || 3600;

export const createToken = user => jwt.sign(
  {
    id: user._id, // eslint-disable-line no-underscore-dangle
    username: user.username,
  },
  process.env.SECRET,
  {
    expiresIn: EXPIRES_IN,
  },
);

export const comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, callback);
};

export const verifyToken = (token, callback) => {
  jwt.verify(token, process.env.SECRET, callback);
};
