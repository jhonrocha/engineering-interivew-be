import { User } from "@entity/User";
import { TaskService } from "@services/TaskService";
import { UserService } from "@services/UserService";
import { Request, Response } from "express";

export class TaskController {
  private taskService = new TaskService();
  private userService = new UserService();

  get = async (req: Request, res: Response) => {
    // Get User from Request
    const user = new User();
    Object.assign(user, res.locals.user);
    try {
      const resp = this.taskService.getByUser(user);
      res.send(resp);
    } catch (e) {
      res.status(500).send(e);
    }
  }

  save = async (req: Request, res: Response) => {
    // Get User from Request
    const user = new User();
    Object.assign(user, res.locals.user);
    const task = req.body;
    task.user = user;
    try {
      const resp = this.taskService.save(task);
      res.send(resp);
    } catch (e) {
      res.status(500).send(e);
    }
  }

  remove = async (req: Request, res: Response) => {
    // Get User from Request
    try {
      const resp = this.taskService.remove(req.body);
      res.send(resp);
    } catch (e) {
      res.status(500).send(e);
    }
  }
}
