import { Router } from 'express';
import multer from 'multer';
import SignInController from '../controllers/SignIn';
import SignUpController from '../controllers/SignUp';
import RefreshController from '../controllers/Refresh';

const router = Router();
const signInController = new SignInController();
const refreshController = new RefreshController();
const upload: multer.Instance = multer();

router.post('/signin', upload.none(), (req, res) => signInController.signIn(req, res));
router.post('/signup', upload.none(), SignUpController.signUp);
router.post('/refresh', (req, res) => refreshController.refresh(req, res));

export default router;
