import jwt from 'jsonwebtoken';
import config from '../config/config';

export const jwtToken = (data = {}, options = {}) => {
  return jwt.sign(data, config.SECRET_JWT_CODE, options);
};

export const pareJwtToken = (token: string, options = {}) => {
  try {
    const data = jwt.verify(token, config.SECRET_JWT_CODE, { ...options });
    return data;
  } catch (err) {
    return err;
  }
};
