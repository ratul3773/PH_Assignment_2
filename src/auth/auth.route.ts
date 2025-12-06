import express from 'express';
import { AuthController } from './auth.controller';
const router = express.Router();

router.post('/signin', AuthController.signinUser);

router.post('/signup', AuthController.signupUser);

export const AuthRouter = router;