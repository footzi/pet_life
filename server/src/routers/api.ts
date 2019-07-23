import { Router } from 'express';
import multer from 'multer';
import SignInController from '../controllers/SignIn';
import SignUpController from '../controllers/SignUp';
import RefreshController from '../controllers/Refresh';

const router = Router();
const upload: multer.Instance = multer();

router.post('/signin', upload.none(), SignInController.signIn);
router.post('/signup', upload.none(), SignUpController.signUp);
router.get('/refresh', RefreshController.refresh);

export default router;
