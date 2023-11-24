import Automations from '@entities/Automation';
import Companies from '@entities/Partner';
import Partner from '@entities/Partner';
import Contract from '@entities/Contract';
import Deal from '@entities/Deal';
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

interface ContractInterface {
  name?: string;
  deal?: Deal;
  partner?: Partner;
}

class ContractController {
  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const contacts = (await Contract.find(queryBuilder(req.query))).reverse();

      return res.status(200).json(contacts);
    } catch (error) {
      return res.status(404).json({ error: 'Find contact failed, try again' });
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      const contact = await Contract.findOne(id, queryBuilder(req.query));

      if (!contact) return res.status(400).json({ message: 'Contract does not exist' });

      return res.status(200).json(contact);
    } catch (error) {
      return res.status(404).json({ error: 'Find contact failed, try again' });
    }
  }
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, partner, deal }: ContractInterface = req.body;

      if (!name || !partner || !deal) return res.status(400).json({message: 'Invalid values for contacts'});

      // const findContract = await Contract.findOne({ email });

      // if (findContract) return res.status(400).json({ message: 'Contract already exists' });

      const contact = await Contract.create({ name, deal, partner }).save();

      if (!contact) return res.status(400).json({ message: 'Cannot create contact' });

      // Notificação para adm ao criar um contato
      // const Origin = contact.state;
      // confirm.sendMail({
      //   to: "suporte.diegociara@gmail.com",
      //   from: '"figio" <api@contato.com>',
      //   subject: `Solicitação de ${name}`, // assunto do email
      //   template: 'newRequest',
      //   context: { name, email, phone, Origin },
      // },
      // (err) => {
      //   if (err) console.log('Email not sent')

      //   transport.close();
      // });

      // transport.sendMail({
      //   to: email,
      //   from: 'contato@figio.com.br',
      //   subject: 'Solicitação de acesso ', // assunto do email
      //   template: 'newContract',

      //   context: { name },
      // },
      // (err) => {
      //   if (err) console.log('Email not sent')

      //   transport.close();
      // });

      return res.status(201).json({ id: contact.id });
    } catch (error) {
      console.error(error);
      return res.status(404).json({ error: 'Create contact failed, try again' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const { name, deal, partner }: ContractInterface = req.body;

      if (!id) return res.status(404).json({ message: 'Please send contact id' });

      const contact = await Contract.findOne(id);

      if (!contact) return res.status(404).json({ message: 'Cannot find contact' });

      const valuesToUpdate: ContractInterface = {
        name: name || contact.name,
        deal: deal || contact.deal,
        partner: partner || contact.partner,
      };

      await Contract.update(id, { ...valuesToUpdate });

      return res.status(200).json();
    } catch (error) {
      return res.status(404).json({ error: 'Update failed, try again' });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(404).json({ message: 'Please send Contract id' });

      const contact = await Contract.findOne(id);

      if (!contact) return res.status(404).json({ message: 'Contract does not exist' });

      await Contract.softRemove(contact);

      return res.status(200).json();
    } catch (error) {
      return res.status(404).json({ error: 'Cannot delete Contract, try again' });
    }
  }
}

export default new ContractController();