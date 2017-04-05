import { Router } from 'express';
import * as ExperienceController from './controller';

const routes = new Router();

routes.post('/experiences', ExperienceController.createExperience);
routes.get('/experiences', ExperienceController.getAllExperiences);

export default routes;
