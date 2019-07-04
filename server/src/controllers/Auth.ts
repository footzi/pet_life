import { Request, Response } from 'express';
import passport from 'passport';
import passportJwt from 'passport-jwt';
import SignInModel from '../models/SignIn';
import { IPayloadJWT, IErrorTypeMessage } from '../interfaces';
import { checkTypeValue, errorMessage, errorTypeMessage } from '../utils';

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
      async (payload: IPayloadJWT, done: Function): Promise<void> => {
        try {
          const user = await SignInModel.signIn(payload.username);

          // где-то тут проверка на соответсвтие id из базы и полученного от клиента. Т.к получение данных для
          // запроса в бд идет из токена
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

  // Проверяет доступен ли пользователю данный маршрут
  public static auth(req: Request, res: Response, next: Function): void {
    if (!checkTypeValue(req.body.id, 'number')) {
      const err = new Error('Oт клиента неполучен id');
      res.status(403).send(errorMessage(err));
      return;
    }

    AuthController.jwtStategy();

    passport.authenticate('jwt', (err: IErrorTypeMessage, user): void => {
      if (err && err.type === 'critical') {
        res.status(500).send(errorMessage(err.content));
        return;
      }

      if (err && err.type === 'user_undefined') {
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
