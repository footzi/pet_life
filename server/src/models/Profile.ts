import { getRepository } from 'typeorm';
import User from '../entities/User';
import { IUser } from '../interfaces';

export default class ProfileModel {
  // Получение профиля
  public static async getProfile(id: number): Promise<IUser> {
    return getRepository(User)
      .findOne({ id })
      .then((result): IUser => result)
      .catch((error): IUser => {
        throw error;
      });
  }
}
