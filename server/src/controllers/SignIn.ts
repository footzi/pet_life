import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import passportLocal from 'passport-local';
import jwt from 'jsonwebtoken';
import SignInModel from '../models/SignIn';

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
            const message = 'Пароль не верен!';
            return done(null, false, { message });
          }
        }

        if (!user) {
          const message = 'Данного пользователя не существует';
          return done(null, false, { message });
        }

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }));
  }

  // Авторизует пользователя
  public static signIn(req: Request, res: Response): void {
    SignInController.localStrategy();

    passport.authenticate('local', { session: false }, (err, user, message): void => {
      if (err) {
        res.status(500).send({ err, message: 'Произошла ошибка на сервере' });
        return;
      }

      if (!user) {
        res.status(403).send(message);
        return;
      }

      const payload = { username: user.name, password: user.password };
      const token = jwt.sign(payload, SECRET);

      res.send({
        user: user.username,
        token
      });
    })(req, res);
  }
}
