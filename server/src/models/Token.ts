import { getRepository } from 'typeorm';
import Tokens from '../entities/Tokens';
import { IToken } from '../interfaces';

export default class TokenModel {
  public static async save(body: IToken): Promise<IToken> {
    const tokens = new Tokens();

    const newToken = await getRepository(Tokens)
      .save(Object.assign(tokens, body))
      .then((result: IToken): IToken => result)
      .catch((error: Error): IToken => {
        throw error;
      });

    return newToken;
  }
}
