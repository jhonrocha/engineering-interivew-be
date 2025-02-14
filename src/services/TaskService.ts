import { Task } from '@entity/Task';
import { User } from '@entity/User';
import { getRepository } from 'typeorm';

export class TaskService {
  private taskRepository = getRepository(Task);

  getById = (id?: number) => {
    return this.taskRepository.findOne(id, { relations: ['user'] });
  };

  getByUser = async (user: User) => {
    return this.taskRepository.find({ user });
  };

  save = async (body: Task) => {
    const create = this.taskRepository.create(body);
    const task = await this.taskRepository.save(create);
    delete task.user;
    return task;
  };

  update = (id: number, body: Task) => {
    return this.taskRepository.update(id, body);
  };

  remove = (task: Task) => {
    return this.taskRepository.remove(task);
  };
}
