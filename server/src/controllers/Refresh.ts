import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IPayloadRefreshToken, IToken } from '../interfaces';
import TokenModel from '../models/Token';
import { errorMessage, errorTypeMessage, parseBearer } from '../utils';
import randomstring from 'randomstring';

const CONFIG = require('../../../server.config.json');

export default class RefreshController {
  refresh_token: string
  payload: IPayloadRefreshToken
  user: IToken
  new_access_token: string
  new_refresh_token: string

  constructor() {
    this.refresh_token = '';
    this.user = { userId: 0, refresh: '' };
    this.payload = { id:0 };
    this.new_access_token = '';
    this.new_refresh_token = '';
  }

  public async refresh(req: Request, res: Response) {
    try {
      this.getToken(req.headers.authorization);
      this.checkToken();
      await this.getUser();
      this.compareTokens();
      await this.createTokens();

      const response = { access_token: this.new_access_token, refresh_token: this.new_refresh_token};
      res.send({ user: response });
    } catch (error) {
      const code = error.type === 'not_access' ? 403 : 500;
      res.status(code).send(errorMessage(error.content));
    }
  }

  getToken(header: string | undefined) {
    if (header) {
      this.refresh_token = parseBearer(header);
    } else {
      throw errorTypeMessage('not_access', 'Токен не получен')
    }
  }

  checkToken() {
    // @ts-ignore
    jwt.verify(this.refresh_token, SECRET, (error: Error, payload: IPayloadRefreshToken) => {
      if (error) {
        throw errorTypeMessage('not_access', 'Токен не действителен')
      }

      this.payload = payload;
    })
  }

  async getUser() {
    try {
      this.user = await TokenModel.get(this.payload.id);
    } catch (error) {
      throw errorTypeMessage('critical', error);
    }

    if (!this.user) {
      throw errorTypeMessage('not_access', 'Для данного пользователя отказано в доступе')
    }
  }

  compareTokens() {
    const db_token = this.user.refresh;

    if (JSON.stringify(db_token) !== JSON.stringify(this.refresh_token)) {
      throw(errorTypeMessage('not_access', 'Токены не совпадают'));
    }
  }

  createTokens() {
    const access = { id: this.user.userId };
    const refresh = { id: this.user.userId, key: randomstring.generate()}
    this.new_access_token = jwt.sign(access, CONFIG.secret, { expiresIn: CONFIG.expire_access });
    this.new_refresh_token = jwt.sign(refresh, CONFIG.secret, { expiresIn: CONFIG.expire_refresh });

    TokenModel.update(this.user.userId, this.new_refresh_token);
  }
};

