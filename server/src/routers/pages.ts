
import axios from 'axios';
import { Router, Request, Response } from 'express';
import multer from 'multer';
import AuthController from '../controllers/Auth';
import ProfileController from '../controllers/Profile';

const router = Router();
const upload: multer.Instance = multer();

router.get('/about', AuthController.auth, async (req: Request, res: Response): Promise<void> => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  res.send({
    id: res.locals.userID,
    users: response.data
  });
});

router.get('/home', AuthController.getUserID, (req: Request, res: Response): void => {
  res.send({ id: res.locals.userID });
});

router.get('/profile', AuthController.auth, ProfileController.getProfile);

export default router;
