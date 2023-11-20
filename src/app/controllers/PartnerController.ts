import Partner from '@entities/Partner';
import queryBuilder from '@utils/queryBuilder';
import { Request, Response } from 'express';

interface PartnerInterface {
  id?: string;
  name?: string;
  type?: string;
  country?: string;
  state?: string;
  city?: string;
  site?: string;
  picture?: string;
}

class PartnerController {
  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const partners = (await Partner.find(queryBuilder(req.query))).reverse();
      return res.status(200).json(partners);
    } catch (error) {
      return res.status(404).json({ message: 'Cannot find partners, try again' });
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send a partner id' });

      const partner = await Partner.findOne(id, queryBuilder(req.query));

      return res.status(200).json(partner);
    } catch (error) {
      return res.status(404).json({ message: 'Cannot find partners, try again' });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, type, country, state, city, site, picture }: PartnerInterface = req.body;

      if (!name || !type) return res.status(400).json({ message: 'Invalid partner name' });

      const partner = await Partner.create({ name, type, country, state, city, site, picture }).save();

      if (!partner) return res.status(400).json({ message: 'Cannot create partner' });

      return res.status(201).json({ id: partner.id, message: 'Partner created successfully' });
    } catch (error) {
      return res.status(404).json({ message: 'Create failed, try again' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { name, type, country, state, city, site, picture }: PartnerInterface = req.body;
      const id = req.params.id;

      const partner = await Partner.findOne(id);

      if (!partner) return res.status(404).json({ message: 'Partner does not exist' });

      const valuesToUpdate: PartnerInterface = {
        country: country || partner.country,
        state: state || partner.state,
        name: name || partner.name,
        type: type || partner.type,
        city: city || partner.city,
        site: site || partner.site,
        picture: picture || partner.picture,
      };

      await Partner.update(id, { ...valuesToUpdate });

      return res.status(200).json({ message: 'Partner updated successfully' });
    } catch (error) {
      return res.status(404).json({ error: 'Update failed, try again' });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send a partner id' });

      const partner = await Partner.findOne(id);

      if (!partner) return res.status(404).json({ message: 'Cannot find partner' });

      await Partner.softRemove(partner);

      return res.status(200).json({ message: 'Partner deleted successfully' });
    } catch (error) {
      return res.status(400).json({ error: 'Remove failed, try again' });
    }
  }
}

export default new PartnerController();
