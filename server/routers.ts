import { Router } from 'express';
import multer from 'multer';
import SignUpController from './controllers/SignUp';

const router = Router();
const upload: multer.Instance = multer();

router.post('/signup', upload.none(), SignUpController.signUp);

export default router;
