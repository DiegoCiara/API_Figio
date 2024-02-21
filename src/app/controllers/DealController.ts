import Contact from '@entities/Contact';
import Company from '@entities/Company';
import Deal from '@entities/Deal';
import Pipeline from '@entities/Pipeline';
import { Request, Response, json } from 'express';
import User from '@entities/User';
import queryBuilder from '@utils/queryBuilder';
import transport from '@src/modules/mailer';
import MailerController from './MailerController';
import Mailers from '@entities/Mailer';
import { mailers } from '@utils/dataMock';
import Automations from '@entities/Automation';
import { NameCompany } from '@src/client';
import Product from '@entities/Product';

interface DealInteface {
  id?: string;
  pipeline?: Pipeline;
  company?: Company;
  contact?: Contact;
  product?: Product;
  name?: string;
  deadline?: Date;
  term?: string;
  priority?: string;
  value?: number;
  status?: string;
  user?: string;
  activity?: ActivityInterface;
}

declare namespace Express {
  interface Request {
    userId: string;
    id:string;
  }
}


interface ActivityInterface {
  tag: string;
  name: string;
  createdAt: Date;
  createdBy: { id: string; name: string };
  description: string;
}

class DealController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const {name, deadline, priority, term, value, status, company, product, contact, pipeline, user }: DealInteface = req.body;
      const { tag } = req.body;

      
      
      const findUser = await User.findOne({ id: user });
      // const createdBy = await idUser;

      const deal = await Deal.create({ 
         name,
         company, 
         product,
         contact,
         user: findUser,
         pipeline,
         deadline,
         priority,
         term,
         value,
         status,
         activity: [  {
           tag: tag || 'HOT',
           name: 'Negociação iniciada',
           description: '',
           createdAt: new Date(),
           createdBy: { id: findUser.id, name: findUser.name },
          },
        ],
      }).save();
      if (!name || !company || !contact || !pipeline || !user ) return res.status(400).json({ message: 'Invalid values for Deal' });
      console.log(deal)
      if (!deal) return res.status(400).json({ message: 'Cannot create Deal' });
      

      return res.status(201).json({ id: deal.id });

    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: 'Cannot create Deal, try again' });
    }
  }



  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const deal = (await Deal.find(queryBuilder(req.query))).reverse();
      // relations: ['company', 'contact', 'pipeline'],

      return res.status(200).json(deal);
    } catch (error) {
      return res.status(400).json({ error: 'Cannot find Deals, try again' });
    }
  }
  
  public async findBySeller(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id; // Certifique-se de que a rota está definida corretamente para capturar esse parâmetro
      
      if (!id) {
        return res.status(400).json({ error: 'No seller ID provided' });
      }
  
      const user = await User.findOne({ where: { id: id } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Agora, usamos o ID do usuário para filtrar as negociações
      const dealsSeller = await Deal.find({
        where: {
          ...req.query, // Adiciona outros filtros da query
          userId: user.id // Assumindo que o campo que referencia o usuário em 'Deal' é 'userId'
        }
      });
  
      console.log(dealsSeller);
      return res.status(200).json(dealsSeller);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: 'Cannot find Deals, try again' });
    }
  }
  

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      const deal = await Deal.findOne(id, queryBuilder(req.query));
      // relations: ['company', 'contact', 'pipeline'],

      if (!deal) return res.status(404).json({ message: 'Deal does not exist' });

      return res.status(200).json(deal);
    } catch (error) {
      return res.status(400).json({ error: 'Cannot find Deal, try again' });
    }
  }


  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { name, priority, value, status, company, product, contact, pipeline, term, deadline }: DealInteface = req.body;
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send Deal id' });

      const deal = await Deal.findOne(id, { relations: ['company', 'contact', 'pipeline'] });

      if (!deal) return res.status(404).json({ message: 'Deal does not exist' });

      const valuesToUpdate = {
        company: company || deal.company, 
        contact: contact || deal.contact,
        pipeline: pipeline || deal.pipeline,
        product: product || deal.product,
        priority: priority || deal.priority,
        term: term || deal.term,
        deadline: deadline || deal.deadline,
        status: status || deal.status,
        value: value || deal.value,
        name: name || deal.name,
      };

      await Deal.update(id, { ...valuesToUpdate });

      return res.status(200).json();
    } catch (error) {
      return res.status(400).json({ error: 'Cannot update Deal, try again' });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send Deal id' });

      const deal = await Deal.findOne(id);

      if (!deal) return res.status(404).json({ message: 'Deal does not exist' });

      await Deal.softRemove(deal);

      return res.status(200).json();
    } catch (error) {
      return res.status(400).json({ error: 'Cannot delete Deal, try again' });
    }
  }

  public async insertActivity(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description, tag, createdAt }: ActivityInterface = req.body;
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send Deal id' });

      const createdBy = await User.findOne(req.userId);

      if (!name || !description || !tag || !createdAt || !createdBy)
        return res.status(400).json({ message: 'Invalid values to insert Activity' });

      const deal = await Deal.findOne(id);

      if (!deal) return res.status(404).json({ message: 'Deal does not exist' });

      deal.activity.push({ name, description, createdAt, tag, createdBy: { id: createdBy.id, name: createdBy.name } });

      await deal.save();

      return res.status(201).json();
    } catch (error) {
      return res.status(400).json({ error: 'Cannot insert activity, try again' });
    }
  }

  public async pipelineUpdate(req: Request, res: Response): Promise<Response> {
    try {
      const { pipeline } = req.body;
      const id = req.params.id;

      const deal = await Deal.findOne(id);

      if (!deal) return res.status(404).json({ error: 'Deal not exist' });

      await Deal.update(id, { pipeline });

      return res.status(200).json();
    } catch (error) {
      return res.status(400).json({ error: 'Cannot update Deal pipeline, try again' });
    }
  }
}

export default new DealController();
