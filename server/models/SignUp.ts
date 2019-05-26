import { getRepository } from 'typeorm';
import User from '../entities/User';

const user = new User();

export default class SignUpModel {
    // Регистрация пользователя
    public static async signUp(body: object): Promise<object> {
        const response = await getRepository(User)
                .save(Object.assign(user, body))
                .then((result): object => result)
                .catch((error): object => {
                    throw error;
                });

        return response;
    }
}
