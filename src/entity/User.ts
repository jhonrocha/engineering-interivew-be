import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { Role } from './Roles';
import { Task } from './Task';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  age?: number;

  @Column({
    nullable: false,
    type: 'set',
    enum: Role,
    default: [Role.User],
    select: false,
  })
  roles?: Role[];

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false, select: false })
  password: string;

  @BeforeUpdate()
  @BeforeInsert()
  hashPwd() {
    this.password = hashSync(this.password, 10);
  }

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
