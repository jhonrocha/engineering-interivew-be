import { AuthController } from '@controller/AuthController';
import { Router } from 'express';
import loginDto from '@dto/loginDto';
import { authenticate } from '@middlewares/auth';
import { Role } from '@entity/Roles';
import { validate } from '@middlewares/valid';

export const AuthRoutes = (): Router => {
  // Create Controller
  const authController = new AuthController();
  // Get Router
  const router = Router();
  // Login and validation
  router.post('/login', validate(loginDto), authController.login);
  // Get Profile
  router.get(
    '/profile',
    authenticate([Role.User]),
    authController.profile
  );
  return router;
};
