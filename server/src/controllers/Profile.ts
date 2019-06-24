import { Request, Response } from 'express';
import ProfileModel from '../models/Profile';

export default class ProfileController {
  public static async getProfile(req: Request, res: Response): Promise<void> {
  	try {
  		const id = req.body.id;
  		const profile = await ProfileModel.getProfile(id);

  		res.status(200).send(profile);

  	} catch(trace) {
  	  const error = { message: 'Ошибка при получении профиля', trace };

      res.status(500).send(error);
  	}
  }
}
