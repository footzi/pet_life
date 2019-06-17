import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import SingUpModel from '../models/SignUp';

const SECRET = require('../../../server.config.json').secret;

export default class SignUpController {
  // Регистрация пользователя
  public static async signUp(req: Request, res: Response): Promise<void> {
    try {
      const passwordHash = bcrypt.hashSync(req.body.password, 10);
      const user = await SingUpModel.signUp({ name: req.body.name, password: passwordHash });
      const payload = {
        username: user.name,
        password: user.password
      };
      const token = jwt.sign(payload, SECRET);

      res.send({
        user: user.name,
        token
      });
    } catch (trace) {
      const error = { text: 'Ошибка при регистрации', trace };

      res.status(500).send(error);
    }
  }
}
