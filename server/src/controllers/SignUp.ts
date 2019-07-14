import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import SingUpModel from '../models/SignUp';
import { checkTypeValue, errorMessage } from '../utils';

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
      const payload = {
        username: user.name,
        password: user.password
      };
      const token = jwt.sign(payload, SECRET);
      const response = { id: user.id, token };

      res.send({ user: response });
    } catch (err) {
      res.status(500).send(errorMessage(err));
    }
  }
}
