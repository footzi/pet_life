import { Request, Response } from 'express';
import ProfileModel from '../models/Profile';

export default class ProfileController {
  public static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const profile = await ProfileModel.getProfile(id);
      const response = {
        id: profile.id,
        name: profile.name,
        surname: profile.surname,
        createDate: profile.createDate
      };

      res.status(200).send(response);
    } catch (trace) {
      const error = { message: 'Ошибка при получении профиля', trace };

      res.status(500).send(error);
    }
  }
}
