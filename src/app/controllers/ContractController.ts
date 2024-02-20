import Automations from '@entities/Automation';
import Companies from '@entities/Partner';
import Partner from '@entities/Partner';
import Contract from '@entities/Contract';
import Deal from '@entities/Deal';
import User from '@entities/User';
import Deals from '@entities/Deal';
import Mailers from '@entities/Mailer';
import Pipelines from '@entities/Pipeline';
import Users from '@entities/User';
import confirm from '@src/modules/confirm';
import transport from '@src/modules/mailer';
import { companies, deals } from '@utils/dataMock';
import queryBuilder from '@utils/queryBuilder';
import { Request, Response } from 'express';
import { pipeline } from 'stream';
import Contact from '@entities/Contact';
import Convenio from '@entities/Convenio';
import Product from '@entities/Product';

interface ContractInterface {
  name?: string;
  deal?: Deal;
  contact?: Contact;
  product?: Product;
  partner?: Partner;
  convenio?: Convenio;
  bank?: string;
  status?: string;
  seller?: User;
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
  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const contracts = (await Contract.find(queryBuilder(req.query))).reverse();

      return res.status(200).json(contracts);
    } catch (error) {
      return res.status(404).json({ error: 'Find contract failed, try again' });
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      const contract = await Contract.findOne(id, queryBuilder(req.query));

      if (!contract) return res.status(400).json({ message: 'Contract does not exist' });

      return res.status(200).json(contract);
    } catch (error) {
      return res.status(404).json({ error: 'Find contract failed, try again' });
    }
  }
  public async create(req: Request, res: Response): Promise<Response> {
    try {

      const { name, bank, partner, product, deal, status }: ContractInterface = req.body;

      if (!name || !deal) return res.status(400).json({message: 'Invalid values for contracts'});

      // const findContract = await Contract.findOne({ deal });

      // if (findContract) return res.status(400).json({ message: 'Contract already exists' });

      const createdBy = await  User.findOne(req.userId)

      const dealId = await Deal.findOne(deal, { relations: ['company', 'contact', 'pipeline', 'product'] });

      const findContact = await Contact.findOne(dealId.contact.id, { relations: ['company', 'convenio'] })

      const contract = await Contract.create({ 
        name, 
        deal,
        contact: dealId?.contact,
        convenio: findContact.convenio,
        partner,
        product: dealId?.product,
        status,
        bank,
        seller: createdBy,
        activity:[  
          {
            tag: 'HOT',
            name: 'Contrato gerado',
            description: '',
            createdAt: new Date(),
            createdBy: { id: createdBy.id, name: createdBy.name },
          },
        ],
      }).save();

      if (!contract) return res.status(400).json({ message: 'Cannot create contract' });

      return res.status(201).json({ id: contract.id });

    } catch (error) {
      console.error(error);
      return res.status(404).json({ error: 'Create contract failed, try again' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { name, partner, product, bank, status }: ContractInterface = req.body;
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send Contract id' });

      const contract = await Contract.findOne(id, { relations: ['deal', 'partner', 'product'] });

      if (!contract) return res.status(404).json({ message: 'Contract does not exist' });

      const valuesToUpdate = {
        name: name || contract.name,
        partner: partner || contract.partner,
        product: product || contract.product,
        bank: bank || contract.bank,
        status: status || contract.status,
      };

      await Contract.update(id, { ...valuesToUpdate });

      return res.status(200).json();
    } catch (error) {
      return res.status(400).json({ error: 'Cannot update Contract, try again' });
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

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(404).json({ message: 'Please send Contract id' });

      const contract = await Contract.findOne(id);

      if (!contract) return res.status(404).json({ message: 'Contract does not exist' });

      await Contract.softRemove(contract);

      return res.status(200).json();
    } catch (error) {
      return res.status(404).json({ error: 'Cannot delete Contract, try again' });
    }
  }
}

export default new ContractController();