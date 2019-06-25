import axios from 'axios';
import { Router, Request, Response } from 'express';
import multer from 'multer';
import AuthController from './controllers/Auth';
import SignInController from './controllers/SignIn';
import SignUpController from './controllers/SignUp';

const router = Router();
const upload: multer.Instance = multer();

router.post('/signin', upload.none(), SignInController.signIn);
router.post('/signup', upload.none(), SignUpController.signUp);

router.get('/pages/about', AuthController.auth, async (req: Request, res: Response): Promise<void> => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  res.send({
    id: res.locals.userID,
    users: response.data
  });
});

router.get('/pages/home', AuthController.getUserID, (req: Request, res: Response): void => {
  res.send({ id: res.locals.userID });
});

router.get('/pages/profile', AuthController.getUserID, (req: Request, res: Response): void => {
  res.send({ id: res.locals.userID });
});

export default router;
