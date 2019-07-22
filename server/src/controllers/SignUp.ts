import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import SingUpModel from '../models/SignUp';
import { checkTypeValue, errorMessage } from '../utils';
import TokenModel from '../models/Token';

const SECRET = require('../../../server.config.json').secret;

export default class SignUpController {
  // Регистрация пользователя
  public static async signUp(req: Request, res: Response): Promise<void> {
    try {
      const { name, surname, password } = req.body;

      if (!checkTypeValue(name, 'string') || !checkTypeValue(password, 'string')) {
        throw new Error('Oт клиента получены неверные данные ');
      }
      const passwordHash = bcrypt.hashSync(password, 10);
      const user = await SingUpModel.signUp({ name, surname, password: passwordHash });
      const access = { username: user.name, password: user.password };
      const refresh = { id: user.id }
      const access_token = jwt.sign(access, SECRET, { expiresIn: '120' });
      const refresh_token = jwt.sign(refresh, SECRET, { expiresIn: '30d' });
      const response = { id: user.id, access_token, refresh_token};

      TokenModel.save({ userId: user.id, refresh: refresh_token});

      res.send({ user: response });
    } catch (err) {
      res.status(500).send(errorMessage(err));
    }
  }
}
