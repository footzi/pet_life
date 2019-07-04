import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import passportLocal from 'passport-local';
import jwt from 'jsonwebtoken';
import SignInModel from '../models/SignIn';
import { checkTypeValue, errorMessage, errorTypeMessage } from '../utils';

const SECRET = require('../../../server.config.json').secret;

const LocalStrategy = passportLocal.Strategy;

export default class SignInController {
  // Стратегия на проверку существование пользователя и правильность пароля
  private static localStrategy(): void {
    passport.use(new LocalStrategy({
      usernameField: 'name',
      passwordField: 'password',
    }, async (username: string, password: string, done: Function): Promise<void> => {
      try {
        const user = await SignInModel.signIn(username);

        if (user) {
          const checkPassword = bcrypt.compareSync(password, user.password);

          if (!checkPassword) {
            const error = errorTypeMessage('password_wrong', 'Пароль не верен');
            return done(error, false);
          }
        }

        if (!user) {
          const error = errorTypeMessage('user_undefined', 'Данного пользователя не существует');
          return done(error, false);
        }

        return done(null, user);
      } catch (err) {
        const error = errorTypeMessage('critical', err);
        return done(error, false);
      }
    }));
  }

  // Авторизует пользователя
  public static signIn(req: Request, res: Response): void {
    if (!checkTypeValue(req.body.name, 'string') || !checkTypeValue(req.body.password, 'string')) {
      const err = new Error('Oт клиента получены неверные данные');
      res.status(403).send(errorMessage(err));
      return;
    }

    SignInController.localStrategy();

    passport.authenticate('local', { session: false }, (err, user): void => {
      if (err && err.type === 'critical') {
        res.status(500).send(errorMessage(err.content));
        return;
      }

      if (err && err.type === 'password_wrong') {
        res.status(403).send(errorMessage(err.content));
        return;
      }

      if (err && err.type === 'user_undefined') {
        res.status(403).send(errorMessage(err.content));
        return;
      }

      const payload = { username: user.name, password: user.password };
      const token = jwt.sign(payload, SECRET);
      const response = { id: user.id, token };

      res.send({ user: response });
    })(req, res);
  }
}
