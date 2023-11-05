import GoalController from '@controllers/GoalController';
import MailerController from '@controllers/MailerController'; 
import Router from 'express';

const routes = Router();

routes.get('/', GoalController.findAll);
routes.get('/:id', GoalController.findById);
routes.put('/:id', GoalController.update);

export default routes;