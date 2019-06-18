import { Request, Response } from 'express';
import passport from 'passport';
import passportJwt from 'passport-jwt';
import SignInModel from '../models/SignIn';
import { IPayloadJWT } from '../interfaces';

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
      // eslint-disable-next-line
      async (payload: IPayloadJWT, done: Function): Promise<void> => {
        try {
          const user = await SignInModel.signIn(payload.username);

          
          console.log(payload)

          if (!user) {
            const message = 'Данного пользователя не существует';
            return done(null, false, { message });
          }

          if (user) {
            return done(null, user);
          }
        } catch (err) {
          return done(err, false);
        }
      }));
  }

  // Проверяет доступен ли пользователю данный маршрут
  public static auth(req: Request, res: Response, next: Function): void {
    AuthController.jwtStategy();

    passport.authenticate('jwt', (err, user, message): void => {
      if (err) {
        res.status(500).send({ err, message: 'Произошла ошибка на сервере' });
        return;
      }

      // console.log(user)

      if (!user) {
        res.status(403).send(message);
        return;
      }

      next();
    })(req, res);
  }
}
