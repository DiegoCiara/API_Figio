import Convenio from '@entities/Convenio';
import queryBuilder from '@utils/queryBuilder';
import { Request, Response } from 'express';

interface ConvenioInterface {
  id?: string;
  name?: string;
}

class ConvenioController {
  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const convenios = (await Convenio.find(queryBuilder(req.query))).reverse();

      return res.status(200).json(convenios);
    } catch (error) {
      return res.status(404).json({ message: 'Cannot find convenios, try again' });
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send a company id' });

      const company = await Convenio.findOne(id, queryBuilder(req.query));

      return res.status(200).json(company);
    } catch (error) {
      return res.status(404).json({ message: 'Cannot find convenios, try again' });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name }: ConvenioInterface = req.body;

      if (!name) return res.status(400).json({ message: 'Invalid company name' });

      const company = await Convenio.create({ name }).save();

      if (!company) return res.status(400).json({ message: 'Cannot create company' });

      return res.status(201).json({ id: company.id, message: 'Convenio created successfully' });
    } catch (error) {
      return res.status(404).json({ message: 'Create failed, try again' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { name }: ConvenioInterface = req.body;
      const id = req.params.id;

      const company = await Convenio.findOne(id);

      if (!company) return res.status(404).json({ message: 'Convenio does not exist' });

      const valuesToUpdate: ConvenioInterface = {
        name: name || company.name,
      };

      await Convenio.update(id, { ...valuesToUpdate });

      return res.status(200).json({ message: 'Convenio updated successfully' });
    } catch (error) {
      return res.status(404).json({ error: 'Update failed, try again' });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send a company id' });

      const company = await Convenio.findOne(id);

      if (!company) return res.status(404).json({ message: 'Cannot find company' });

      await Convenio.softRemove(company);

      return res.status(200).json({ message: 'Convenio deleted successfully' });
    } catch (error) {
      return res.status(400).json({ error: 'Remove failed, try again' });
    }
  }
}

export default new ConvenioController();
