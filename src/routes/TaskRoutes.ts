import { TaskController } from '@controller/TaskController';
import { Router } from 'express';
import { validate } from '@middlewares/valid';
import { authenticate } from '@middlewares/auth';
import { Role } from '@entity/Roles';
import { createTask } from '@dto/taskDto';

export const TaskRoutes = (): Router => {
  // Get Router
  const router = Router();
  // Add Controller
  const taskController = new TaskController();
  // Get all or some user
  router.post(
    '/tasks/',
    authenticate([Role.User]),
    validate(createTask),
    taskController.save
  );
  router.get(
    '/tasks/',
    authenticate([Role.User]),
    taskController.getByUser
  );
  router.get(
    '/tasks/:id',
    authenticate([Role.User]),
    taskController.get
  );
  router.put(
    '/tasks/:id',
    authenticate([Role.User]),
    validate(createTask),
    taskController.update
  );
  router.delete(
    '/tasks/:id',
    authenticate([Role.User]),
    taskController.remove
  );
  router.post(
    '/tasks/user/:userId',
    authenticate([Role.Admin]),
    validate(createTask),
    taskController.saveTaskUser
  );

  return router;
};
