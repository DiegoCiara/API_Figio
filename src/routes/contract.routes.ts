import ContractController from '@controllers/ContractController';
import Router from 'express';

const routes = Router();

routes.get('/', ContractController.findAll);
routes.get('/:id', ContractController.findById);
routes.post('/', ContractController.create);
routes.put('/:id', ContractController.update);
routes.delete('/:id', ContractController.delete);

export default routes;