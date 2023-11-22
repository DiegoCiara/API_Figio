import Contact from '@entities/Contact';
import Company from '@entities/Company';
import Contract from '@entities/Contract';
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
import Deal from '@entities/Deal';
import Partner from '@entities/Partner';

interface ContractInteface {
  id?: string;
  deal?: Deal;
  partner?: Partner;
  bank?: Partner;
  name?: string;
  deadline?: Date;
  priority?: string;
  status?: string;
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

class ContractController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const {name, deal, partner, bank, deadline, priority, status}: ContractInteface = req.body;
      const { tag } = req.body;

      
      const createdBy = await  User.findOne(req.userId)
      
      // const createdBy = await idUser;

      const contract = await Contract.create({  
         name,
         deal,
         partner,
         bank,
         deadline,
         priority,
         status,
         activity: [  {
           tag: tag || 'HOT',
           name: 'Negociação iniciada',
           description: '',
           createdAt: new Date(),
           createdBy: { id: createdBy.id, name: createdBy.name },
          },
        ],
      }).save();
      if (!name) return res.status(400).json({ message: 'Invalid values for Contract' });
      console.log(contract)
      if (!contract) return res.status(400).json({ message: 'Cannot create Contract' });
      

      return res.status(201).json({ id: contract.id });

    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: 'Cannot create Contract, try again' });
    }
  }



  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const contract = (await Contract.find(queryBuilder(req.query))).reverse();
      // relations: ['company', '', '],

      return res.status(200).json(contract);
    } catch (error) {
      return res.status(400).json({ error: 'Cannot find Contracts, try again' });
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      const contract = await Contract.findOne(id, queryBuilder(req.query));
      // relations: ['company', '', '],

      if (!contract) return res.status(404).json({ message: 'Contract does not exist' });

      return res.status(200).json(contract);
    } catch (error) {
      return res.status(400).json({ error: 'Cannot find Contract, try again' });
    }
  }


  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { name, deal, partner, bank, priority, status, deadline }: ContractInteface = req.body;
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send Contract id' });

      const contract = await Contract.findOne(id);

      if (!contract) return res.status(404).json({ message: 'Contract does not exist' });

      const valuesToUpdate = {
        deal: deal || contract.deal,
        partner: partner || contract.partner,
        bank: bank || contract.bank,
        priority: priority || contract.priority,
        deadline: deadline || contract.deadline,
        status: status || contract.status,
        name: name || contract.name,
      };

      await Contract.update(id, { ...valuesToUpdate });

      return res.status(200).json();
    } catch (error) {
      return res.status(400).json({ error: 'Cannot update Contract, try again' });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send Contract id' });

      const contract = await Contract.findOne(id);

      if (!contract) return res.status(404).json({ message: 'Contract does not exist' });

      await Contract.softRemove(contract);

      return res.status(200).json();
    } catch (error) {
      return res.status(400).json({ error: 'Cannot delete Contract, try again' });
    }
  }

  public async insertActivity(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description, tag, createdAt }: ActivityInterface = req.body;
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send Contract id' });

      const createdBy = await User.findOne(req.userId);

      if (!name || !description || !tag || !createdAt || !createdBy)
        return res.status(400).json({ message: 'Invalid values to insert Activity' });

      const contract = await Contract.findOne(id);

      if (!contract) return res.status(404).json({ message: 'Contract does not exist' });

      contract.activity.push({ name, description, createdAt, tag, createdBy: { id: createdBy.id, name: createdBy.name } });

      await contract.save();

      return res.status(201).json();
    } catch (error) {
      return res.status(400).json({ error: 'Cannot insert activity, try again' });
    }
  }
}

export default new ContractController();
