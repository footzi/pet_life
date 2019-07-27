import { getRepository } from 'typeorm';
import User from '../entities/User';
import { IUser } from '../interfaces';

export default class SignInModel {
  // Авторизация пользователя
  public static async signIn(login: string): Promise<IUser | null> {
    const user = await getRepository(User)
      .findOne({ login })
      .then((result): IUser | null => result || null)
      .catch((error): IUser => {
        throw error;
      });

    return user;
  }
}
