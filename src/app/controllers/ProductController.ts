import Convenio from '@entities/Convenio';
import Product from '@entities/Product';
import queryBuilder from '@utils/queryBuilder';
import { Request, Response } from 'express';

interface ProductInterface {
  id?: string;
  name?: string;
  convenio?: Convenio;
}

class ProductController {
  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const products = (await Product.find(queryBuilder(req.query))).reverse();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(404).json({ message: 'Cannot find products, try again' });
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send a product id' });

      const product = await Product.findOne(id, queryBuilder(req.query));

      return res.status(200).json(product);
    } catch (error) {
      return res.status(404).json({ message: 'Cannot find products, try again' });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, convenio }: ProductInterface = req.body;

      if (!name || !convenio) return res.status(400).json({ message: 'Invalid product name' });

      const product = await Product.create({ name, convenio }).save();

      if (!product) return res.status(400).json({ message: 'Cannot create product' });

      return res.status(201).json({ id: product.id, message: 'Product created successfully' });
    } catch (error) {
      return res.status(404).json({ message: 'Create failed, try again' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { name, convenio }: ProductInterface = req.body;
      const id = req.params.id;

      const product = await Product.findOne(id);

      if (!product) return res.status(404).json({ message: 'Product does not exist' });

      const valuesToUpdate: ProductInterface = {
        name: name || product.name,
        convenio: convenio || product.convenio,
      };

      await Product.update(id, { ...valuesToUpdate });

      return res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
      return res.status(404).json({ error: 'Update failed, try again' });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send a product id' });

      const product = await Product.findOne(id);

      if (!product) return res.status(404).json({ message: 'Cannot find product' });

      await Product.softRemove(product);

      return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      return res.status(400).json({ error: 'Remove failed, try again' });
    }
  }
}

export default new ProductController();
