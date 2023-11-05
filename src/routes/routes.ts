import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import DealRoutes from '@routes/deal.routes';
import Router from 'express';
import AuthRoutes from './auth.routes';
import AutomationRoutes from './automation.routes';
import MailerRoutes from './mailer.routes';
import GoalRoutes from './goal.routes';
import CompanyRoutes from './company.routes';
import ContactRoutes from './contact.routes';
import PipelineRoutes from './pipeline.routes';
import FunnelRoutes from './funnel.routes';
import UserRoutes from './user.routes';

const routes = Router();

routes.get('/', (req, res) => {
  res.json({ API: 'Terceiro Semetre' });
});

// prefix
routes.use('/auth', AuthRoutes);
routes.use('/user', UserRoutes); // middlewares estão no UserRoutes;
routes.use('/pipeline', PipelineRoutes);
routes.use('/automation', AutomationRoutes);
routes.use('/mail', MailerRoutes);
routes.use('/goal', GoalRoutes);
routes.use('/funnel', FunnelRoutes);
routes.use('/company', CompanyRoutes);
routes.use('/contact', ContactRoutes);
routes.use('/deal', DealRoutes);

export default routes;
