import { Request, Response } from 'express';
import SingUpModel from '../models/SignUp';

export default class SignUpController {
    // Регистрация пользователя
    public static async signUp(req: Request, res: Response): Promise<void> {
        try {
            const result = await SingUpModel.signUp(req.body);

            res.send(result);
        } catch (trace) {
            const error = { text: 'Ошибка при регистрации', trace };

            res.status(500).send(error);
        }
    }
}
