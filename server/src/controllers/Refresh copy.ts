import { Request, Response } from 'express';
import passport from 'passport';
import passportJwt from 'passport-jwt';
import jwt from 'jsonwebtoken';
import { IPayloadRefreshToken } from '../interfaces';
import TokenModel from '../models/Token';
import { errorMessage, errorTypeMessage } from '../utils';

const SECRET = require('../../../server.config.json').secret;
const { ExtractJwt } = passportJwt;
const JwtStrategy = passportJwt.Strategy;

export default class RefreshController {
  payload: IPayloadRefreshToken
  user: String

  constructor() {
    this.payload = { id: 0 };
    this.user = '';
  }

  public refresh(req: Request, res: Response) {
    console.log(this);
    this.jwtStategy();

    passport.authenticate(
      'jwt',
      (err, user): void => {
        if (err && err.type === 'not_access') {
          res.status(403).send(errorMessage(err.content));
          return;
        }

        console.log(err)
        console.log(user)

        if (!user) {
          res.status(403).send(errorMessage(new Error('Для данного пользователя отказано в доступе')));
          return;
        }
        res.status(200).send(user);
      }
    )(req, res);
  }

  private jwtStategy(): void {
    const options = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET
    };

    passport.use(
      'jwt',
      new JwtStrategy(
        options,
        async (payload: IPayloadRefreshToken, done: Function): Promise<void> => {
          this.payload = payload;

          try {
            await this.checkUser(done);
            console.log('иуи')
            return done(errorTypeMessage('not_access', 'Данного пользователя не существует'), false);
          
            // if (!this.user) {
            //   return done(errorTypeMessage('not_access', 'Данного пользователя не существует'), false);
            // }

            // const refresh_token = this.user.refresh;
            // const decoded = jwt.verify(refresh_token, SECRET);

            // if (JSON.stringify(decoded) !== JSON.stringify(payload)) {
            //   return done(errorTypeMessage('not_access', 'Токены не совпадают'), false);
            // }

            // jwt.verify(refresh_token, SECRET, (err: Error) => {
            //   if (err) {
            //     return done(errorTypeMessage('not_access', 'Токен просрочен'), false);
            //   }
            // })

            // return done(null, user);
          } catch (err) {
            const error = errorTypeMessage('critical', err);
            return done(error, false);
          }
        }
      )
    );
  }

  

  // стратегия на валидность рефреш токена
  

  private async checkUser(done: Function) {
    this.user = await TokenModel.get(this.payload.id);
    
  }
}
