import express from 'express';
import dbConfig from './config/db';
import middlewareConfig from './config/middleware';
import { ExperienceRoutes } from './modules';

const app = express();

dbConfig();
middlewareConfig(app);

app.use('/api', [ExperienceRoutes]);

const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
  if (err) {
    console.error(err);
  }
  else {
    console.log(`App listening on port: ${PORT}`);
  }
});