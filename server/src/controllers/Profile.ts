import { Request, Response } from 'express';
import ProfileModel from '../models/Profile';
import { errorMessage, checkTypeValue } from '../utils';
// import { , errorMessage, errorTypeMessage } from '../utils';

export default class ProfileController {
  public static async getProfile(req: Request, res: Response): Promise<void> {
    const requestId = Number(req.body.id);
    const tokenId = res.locals.user.id;
    const checkTypeId = checkTypeValue(requestId, 'number') && checkTypeValue(tokenId, 'number');
    const checkValidId = requestId === tokenId;

    if (!checkTypeId || !checkValidId) {
      const err = new Error('Oт клиента получены неверные данные');
      res.status(403).send(errorMessage(err));
      return;
    }

    try {
      const profile = await ProfileModel.getProfile(req.body.id);
      const { id, name, surname, createDate } = profile;
      const response = {
        user: res.locals.user,
        profile: {
          id,
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
