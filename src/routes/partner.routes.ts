import PartnerController from '@controllers/PartnerController';

import Router from 'express';

const routes = Router();

routes.get('/', PartnerController.findAll);
routes.get('/:id', PartnerController.findById);
routes.post('/', PartnerController.create);
routes.put('/:id', PartnerController.update);
routes.delete('/:id', PartnerController.delete);

export default routes;