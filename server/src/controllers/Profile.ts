import { Request, Response } from 'express';
import ProfileModel from '../models/Profile';
import { errorMessage } from '../utils';

export default class ProfileController {
  public static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const profile = await ProfileModel.getProfile(req.body.id);
      const { name, surname, createDate } = profile;
      const response = {
        user: res.locals.user,
        profile: {
          name,
          surname,
          createDate
        }
      };

      res.status(200).send(response);
    } catch (err) {
      res.status(500).send(errorMessage(err));
    }
  }
}
