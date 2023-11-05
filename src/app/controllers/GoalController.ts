import { Request, Response } from 'express';
import queryBuilder from '@utils/queryBuilder';
import Goal from '@entities/Goal';

interface GoalInterface {
  id?: string;
  index: string
}

class GoalController {
  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const goal = (await Goal.find(queryBuilder(req.query)));
      if (!goal) return res.status(400).json({ error: 'Cannot find Goals.' });
      return res.status(200).json(goal);
    } catch (error) {
      return res.status(404).json({ error: 'Get Goal Failed, try again' });
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send a Goal id' });

      const goal = await Goal.findOne(id, queryBuilder(req.query));

      if (!goal) return res.status(400).json({ error: 'Cannot find Goal.' });

      return res.status(200).json(goal);
    } catch (error) {
      return res.status(404).json({ error: 'Get Goal Failed, try again' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { index }: GoalInterface = req.body;
      const id = req.params.id;

      //if (!id) return res.status(400).json({ message: 'Please send a Goal id' });

     //if (!name) return res.status(400).json({ error: 'Invalid index for Goal' });

      const goal = await Goal.findOne(id);

      if (!goal) return res.status(404).json({ message: 'Goal does not exist' });

      await Goal.update(id, { index });

      return res.status(200).json({ message: 'Goal updated successfully' });
    } catch (error) {
      return res.status(404).json({ error: 'Update failed, try again' });
    }
  }

}

export default new GoalController();
