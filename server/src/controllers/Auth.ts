import { Request, Response } from 'express';
import passport from 'passport';
import passportJwt from 'passport-jwt';
import SignInModel from '../models/SignIn';
import { IPayloadAccessToken, IErrorTypeMessage } from '../interfaces';
import { errorMessage, errorTypeMessage } from '../utils';

const SECRET = require('../../../server.config.json').secret;
const { ExtractJwt } = passportJwt;
const JwtStrategy = passportJwt.Strategy;

export default class AuthController {
  // Стратегия на проверку существования пользователя и валидность токена
  private static jwtStategy(): void {
    const options = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET
    };

    passport.use('jwt', new JwtStrategy(options,
      async (payload: IPayloadAccessToken, done: Function): Promise<void> => {
        try {
          const user = await SignInModel.signIn(payload.login);

          if (!user) {
            const error = errorTypeMessage('not_access', 'Данного пользователя не существует');
            return done(error, false);
          }

          return done(null, user);
        } catch (err) {
          const error = errorTypeMessage('critical', err);
          return done(error, false);
        }
      }
    ));
  }

  // Проверяет доступен ли пользователю данный маршрут
  public static auth(req: Request, res: Response, next: Function): void {
    AuthController.jwtStategy();

    passport.authenticate('jwt', (err: IErrorTypeMessage, user): void => {
      if (err && err.type === 'critical') {
        res.status(500).send(errorMessage(err.content));
        return;
      }

      if (err && err.type === 'not_access') {
        res.status(403).send(errorMessage(err.content));
        return;
      }

      if (!user) {
        const error = new Error('Для данного пользователя отказано в доступе');
        res.status(403).send(errorMessage(error));
        return;
      }

      res.locals.user = user ? { id: user.id } : null;

      next();
    })(req, res);
  }

  // Возвращает id пользователя при успешной аутентификации или null
  public static getUser(req: Request, res: Response, next: Function): void {
    AuthController.jwtStategy();

    passport.authenticate('jwt', (err, user): void => {
      if (err) {
        const error = new Error('При проверке авторизации произошла ошибка');
        res.status(500).send(errorMessage(error));
        return;
      }

      res.locals.user = user ? { id: user.id } : null;
      next();
    })(req, res);
  }
}
