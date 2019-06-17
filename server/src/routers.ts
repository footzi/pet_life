import { Router } from 'express';
import multer from 'multer';
import SignInController from './controllers/SignIn';
import SignUpController from './controllers/SignUp';

const router = Router();
const upload: multer.Instance = multer();

router.post('/signin', upload.none(), SignInController.signIn);
router.post('/signup', upload.none(), SignUpController.signUp);

export default router;
