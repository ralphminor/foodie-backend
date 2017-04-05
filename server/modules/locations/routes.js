import { Router } from 'express';
import * as LocationController from './controller';

const routes = new Router();

routes.post('/locations/new', LocationController.createLocation);
routes.post('/locations/:locationId/experiences/new', LocationController.createLocationExperience);
routes.get('/locations/:locationId/experiences', LocationController.getLocationExperiences);

export default routes;
