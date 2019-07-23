import { Request, Response } from 'express';
import passport from 'passport';
import passportJwt from 'passport-jwt';
import { IPayloadRefreshToken } from '../interfaces';

const SECRET = require('../../../server.config.json').secret;
const { ExtractJwt } = passportJwt;
const JwtStrategy = passportJwt.Strategy;

export default class RefreshController {
    // стратегия на валидность рефреш токена
    private static jwtStategy(): void {
      const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: SECRET
      };

      passport.use('jwt', new JwtStrategy(options,
        async (payload: IPayloadRefreshToken, done: Function): Promise<void> => {
          console.log(payload);
          // try {
          //   const user = await SignInModel.signIn(payload.username);
  
          //   if (!user) {
          //     const error = errorTypeMessage('user_undefined', 'Данного пользователя не существует');
          //     return done(error, false);
          //   }
  
          //   return done(null, user);
          // } catch (err) {
          //   const error = errorTypeMessage('critical', err);
          //   return done(error, false);
          // }
        }
      ));
    }

    public static refresh(req: Request, res: Response) {
      RefreshController.jwtStategy();
    }
}