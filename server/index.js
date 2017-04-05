import express from 'express';
import dbConfig from './config/db';
import middlewareConfig from './config/middleware';

const app = express();

const PORT = process.env.PORT || 3000;

dbConfig();
middlewareConfig(app);

app.listen(PORT, err => {
  if (err) {
    console.error(err);
  }
  else {
    console.log(`App listening on port: ${PORT}`);
  }
});
