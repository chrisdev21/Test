import mongoose from 'mongoose';
import config from './config';

const MONGO_URI = `mongodb://${config.DB_HOST}/${config.DB_NAME}`;
mongoose.connect(MONGO_URI).then((r) => {
  console.log('Database is connected successfully');
});

mongoose.set('toJSON', {
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;

    return ret;
  },
});
