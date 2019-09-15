import { Router } from 'express';
import multer from 'multer';
import SignInController from '../controllers/SignIn';
import SignUpController from '../signUp/SignUp.controller';
import RefreshController from '../controllers/Refresh';

const router = Router();
const upload: multer.Instance = multer();

router.post('/signin', upload.none(), (req, res) => new SignInController().signIn(req, res));
router.post('/signup', upload.none(), (req, res) => new SignUpController().signUp(req, res));
router.post('/refresh', (req, res) => new RefreshController().refresh(req, res));

export default router;
