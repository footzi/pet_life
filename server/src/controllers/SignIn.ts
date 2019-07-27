import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import SignInModel from '../models/SignIn';
import TokenModel from '../models/Token';
import { checkTypeValue, errorMessage, errorTypeMessage } from '../utils';
import randomstring from 'randomstring';

const CONFIG = require('../../../server.config.json');

export default class SignInController {
  body: {
    login: string
    password: string
  }
  user: {
    id: number
    password: string
  }
  tokens: {
    access: string
    refresh: string
  }

  constructor() {
    this.body = { login: '', password: '' };
    this.user = { id: 0, password: '' };
    this.tokens = { access: '', refresh:'' };
  }

  public async signIn(req: Request, res: Response) {
    this.body = req.body;

    try {
      this.checkValue();
      await this.getUser()
    } catch(error) {
      const code = error.type === 'not_access' ? 403 : 500;
      res.status(code).send(errorMessage(error.content));
    }
  }

  checkValue() {
    const { login, password } = this.body;

    if (!checkTypeValue(login, 'string') || !checkTypeValue(password, 'string')) {
      throw errorTypeMessage('not_access', 'Oт клиента получены неверные данные')
    }
  }

  async getUser() {
    try {
      const user = await SignInModel.signIn(this.body.login);

      if (!user) {
        throw errorTypeMessage('not_access', 'Данного пользователя не существует');  
      }

      this.user.id = user.id;
      this.user.password = user.password;
    } catch (error) {
      throw errorTypeMessage('critical', error);
    }
  }

  checkPassword() {
    const checkPassword = bcrypt.compareSync(this.body.password, this.user.password);

    if (!checkPassword) {
      throw errorTypeMessage('not_access', 'Неверный пароль')
    }
  }

  createTokens() {
    const access = { id: this.user.id };
    const refresh = { id: this.user.id, key: randomstring.generate()}
    this.tokens.access = jwt.sign(access, CONFIG.secret, { expiresIn: CONFIG.expire_access });
    this.tokens.refresh = jwt.sign(refresh, CONFIG.secret, { expiresIn: CONFIG.expire_refresh });

    TokenModel.save({ userId: this.user.id, refresh: this.tokens.refresh});
  }
  // // Стратегия на проверку существование пользователя и правильность пароля
  // private static localStrategy(): void {
  //   passport.use(new LocalStrategy({
  //     usernameField: 'name',
  //     passwordField: 'password',
  //   }, async (username: string, password: string, done: Function): Promise<void> => {
  //     try {
  //       const user = await SignInModel.signIn(username);

  //       if (user) {
  //         const checkPassword = bcrypt.compareSync(password, user.password);

  //         if (!checkPassword) {
  //           const error = errorTypeMessage('not_access', 'Пароль не верен');
  //           return done(error, false);
  //         }
  //       }

  //       if (!user) {
  //         const error = errorTypeMessage('not_access', 'Данного пользователя не существует');
  //         return done(error, false);
  //       }

  //       return done(null, user);
  //     } catch (err) {
  //       const error = errorTypeMessage('critical', err);
  //       return done(error, false);
  //     }
  //   }));
  // }

  // // Авторизует пользователя
  // public static signIn(req: Request, res: Response): void {
  //   if (!checkTypeValue(req.body.name, 'string') || !checkTypeValue(req.body.password, 'string')) {
  //     const err = new Error('Oт клиента получены неверные данные');
  //     res.status(403).send(errorMessage(err));
  //     return;
  //   }

  //   SignInController.localStrategy();

  //   passport.authenticate('local', { session: false }, (err, user): void => {
  //     if (err && err.type === 'critical') {
  //       res.status(500).send(errorMessage(err.content));
  //       return;
  //     }

  //     if (err && err.type === 'not_access') {
  //       res.status(403).send(errorMessage(err.content));
  //       return;
  //     }

  //     try {
  //       const access = { id: user.id, username: user.name };
  //       const refresh = { id: user.id }
  //       const access_token = jwt.sign(access, SECRET, { expiresIn: '120' });
  //       const refresh_token = jwt.sign(refresh, SECRET, { expiresIn: '30d' });
  //       const response = { id: user.id, access_token, refresh_token};

  //       TokenModel.save({ userId: user.id, refresh: refresh_token});

  //       res.send({ user: response });
  //     } catch {
  //       res.status(500).send(errorMessage(err));
  //     }
  //   })(req, res);
  // }
}
