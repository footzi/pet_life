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

router.get('/about', AuthController.auth, async (req: Request, res: Response): Promise<any> => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  res.send(response.data);
});

router.get('/home', async (req: Request, res: Response): Promise<void> => {
  const id = AuthController.getUser(req, res);
  console.log(id);
  // const response = await axios.get('https://jsonplaceholder.typicode.com/users');

  res.status(200).send({ id, users: response.data });
});

export default router;
