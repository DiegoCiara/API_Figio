import ConvenioController from '@controllers/ConvenioController'
import Router from 'express';

const routes = Router();

routes.get('/', ConvenioController.findAll);
routes.get('/:id', ConvenioController.findById);
routes.post('/', ConvenioController.create);
routes.put('/:id', ConvenioController.update);
routes.delete('/:id', ConvenioController.delete);

export default routes;
