import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import SingUpModel from '../models/SignUp';
import { checkTypeValue, errorMessage } from '../utils';
import TokenModel from '../models/Token';
import randomstring from 'randomstring';

const CONFIG = require('../../../server.config.json');

export default class SignUpController {
  // Регистрация пользователя
  public static async signUp(req: Request, res: Response): Promise<void> {
    try {
      const { login, surname, password } = req.body;

      if (!checkTypeValue(login, 'string') || !checkTypeValue(password, 'string')) {
        throw new Error('Oт клиента получены неверные данные ');
      }
      const passwordHash = bcrypt.hashSync(password, 10);
      const user = await SingUpModel.signUp({ login, surname, password: passwordHash });
      const access = { id: user.id };
      const refresh = { id: user.id, key: randomstring.generate()}
      const access_token = jwt.sign(access, CONFIG.secret, { expiresIn: CONFIG.expire_access });
      const refresh_token = jwt.sign(refresh, CONFIG.secret, { expiresIn: CONFIG.expire_refresh });
      const response = { id: user.id, access_token, refresh_token};

      TokenModel.save({ userId: user.id, refresh: refresh_token});

      res.send({ user: response });
    } catch (err) {
      res.status(500).send(errorMessage(err));
    }
  }
}
