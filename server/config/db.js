import mongoose from 'mongoose';
const dotenv = require('dotenv');
dotenv.load();

const MONGODB_URI = process.env.MONGODB_URI;

export default () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(MONGODB_URI + '/foodie');
  mongoose.connection
    .once('open', () => console.log('Mongodb running'))
    .on('error', err => console.error(err))
};
