import { Role } from '@entity/Roles';
import { Task } from '@entity/Task';
import { User } from '@entity/User';
import { TaskService } from '@services/TaskService';
import { Request, Response } from 'express';

export class TaskController {
  private taskService = new TaskService();

  checkPermission = (user: User, task?: Task): boolean => {
    if (user.roles.find((s) => s == Role.Admin)) return true;
    else {
      return task.user.id === user.id;
    }
  };

  // Admin has full permissions
  get = async (req: Request, res: Response) => {
    try {
      // Get User from Response
      const { user } = res.locals;
      const task = await this.taskService.getById(+req.params.id);
      if (task) {
        if (this.checkPermission(user, task)) return res.json(task);
        else return res.sendStatus(403);
      } else {
        return res.sendStatus(404);
      }
    } catch (e) {
      return res.status(500).send(e);
    }
  };

  getByUser = async (req: Request, res: Response) => {
    try {
      // Get User from Request
      const user = new User();
      Object.assign(user, res.locals.user);
      const resp = await this.taskService.getByUser(user);
      return res.send(resp);
    } catch (e) {
      return res.status(500).send(e);
    }
  };

  save = async (req: Request, res: Response) => {
    try {
      // Get User from Request
      const user = new User();
      Object.assign(user, res.locals.user);
      const task = req.body;
      task.user = user;
      const resp = await this.taskService.save(task);
      return res.send(resp);
    } catch (e) {
      return res.status(500).send(e);
    }
  };

  saveTaskUser = async (req: Request, res: Response) => {
    try {
      // Get User from Request
      const user = new User();
      user.id = req.params.userId;
      const task = req.body;
      task.user = user;
      const resp = await this.taskService.save(task);
      return res.send(resp);
    } catch (e) {
      return res.status(500).send(e);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const task = req.body;
      const { user } = res.locals;
      const target = await this.taskService.getById(+req.params.id);
      if (!target) return res.sendStatus(404);
      if (this.checkPermission(user, target)) {
        const result = await this.taskService.update(
          +req.params.id,
          task
        );
        return res.json(result);
      } else return res.sendStatus(403);
    } catch (e) {
      return res.status(500).send(e);
    }
  };

  remove = async (req: Request, res: Response) => {
    // Get User from Request
    try {
      const { user } = res.locals;
      const target = await this.taskService.getById(+req.params.id);
      if (!target) return res.sendStatus(404);
      if (this.checkPermission(user, target)) {
        const resp = await this.taskService.remove(target);
        return res.json({ message: `Task ${target.id} deleted!` });
      } else return res.sendStatus(403);
    } catch (e) {
      console.error(e);
      return res.status(500).send(e);
    }
  };
}
