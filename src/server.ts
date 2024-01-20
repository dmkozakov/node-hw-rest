import mongoose from 'mongoose';

import app from './app';

const { DB_URI } = process.env;

if (typeof DB_URI === 'string') {
  mongoose
    .connect(DB_URI)
    .then(() => {
      app.listen(3000);
      console.log('Database connection successful');
    })
    .catch((error) => {
      console.log(error.message);
      process.exit(1);
    });
}
