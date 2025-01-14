import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

export enum Status {
  ToDo = 'toDo',
  InProgress = 'inProgress',
  Done = 'done',
  Archived = 'archived',
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false, default: Status.ToDo })
  status: Status;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
