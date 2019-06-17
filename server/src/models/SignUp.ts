import { getRepository } from 'typeorm';
import User from '../entities/User';
import { IUser } from '../interfaces';

const user = new User();

export default class SignUpModel {
  // Регистрация пользователя
  public static async signUp(body: IUser): Promise<IUser> {
    const checkUser = await getRepository(User)
      .findOne({ name: body.name })
      .then((result): IUser | null => result || null)
      .catch((error): IUser => {
        throw error;
      });

    if (checkUser) {
      const error = { message: 'Данный пользователь уже существует' };
      throw error;
    }

    const newUser = await getRepository(User)
      .save(Object.assign(user, body))
      .then((result): IUser => result)
      .catch((error): IUser => {
        throw error;
      });

    return newUser;
  }
}
