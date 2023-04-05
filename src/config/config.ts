require('dotenv').config();

export default {
  DB_HOST: process.env.MONGO_HOSTNAME || '127.0.0.1:27017',
  DB_NAME: process.env.MONGO_DB || 'event',
  SECRET_JWT_CODE: process.env.SECRET_JWT_CODE || '123456789',
}