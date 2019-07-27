import { getRepository } from 'typeorm';
import User from '../entities/User';
import { IUser, IFormCheckIn } from '../interfaces';

export default class SignUpModel {
  // Регистрация пользователя
  public static async signUp(body: IFormCheckIn): Promise<IUser> {
    const user = new User();

    const checkUser = await getRepository(User)
      .findOne({ login: body.login })
      // @ts-ignore
      .then((result: IUser): IUser | null => result || null)
      .catch((error: Error): Error => {
        throw error;
      });

    if (checkUser) {
      throw new Error('Данный пользователь уже существует');
    }

    const newUser = await getRepository(User)
      .save(Object.assign(user, body))
      .then((result: IUser): IUser => result)
      .catch((error: Error): IUser => {
        throw error;
      });

    return newUser;
  }
}
