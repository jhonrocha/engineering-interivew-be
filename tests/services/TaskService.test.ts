import { closeDb, connectDb } from '@config/Db';
import { Status, Task } from '@entity/Task';
import { User } from '@entity/User';
import { TaskService } from '@services/TaskService';
import { UserService } from '@services/UserService';

describe('TaskService Test', () => {
  let taskService: TaskService;
  let userService: UserService;
  let user: User;
  // Test Task
  let testTask: Task = new Task();
  testTask.title = 'Test Title Task - ' + Date.now();
  testTask.description = 'Test Description Task - ' + Date.now();
  testTask.status = Status.Archived;
  // The DB task
  let storeTask: Task = new Task();

  beforeAll(async () => {
    await connectDb();
    taskService = new TaskService();
    userService = new UserService();
    user = await userService.save(
      Object.assign(new User(), {
        username: 'Test user' + Date.now(),
        password: 'Test password' + Date.now(),
      })
    );
    testTask.user = user;
  });

  afterAll(async () => {
    try {
      await userService.remove(user);
    } catch (e) {
      console.error(e);
    }
    await closeDb();
  });

  test('Should exist', () => {
    expect(taskService).toBeDefined();
  });

  test('save: should save a task', async () => {
    expect(taskService.save).toBeDefined();
    storeTask = await taskService.save(testTask);
    expect(storeTask).toBeInstanceOf(Task);
    expect(storeTask.id).toBeDefined();
    delete testTask.user;
    testTask.id = storeTask.id;
    expect(storeTask).toStrictEqual(testTask);
  });

  test('save: should fail for invalid input', async () => {
    try {
      await taskService.save(null);
      throw 'Should fail!';
    } catch {
      // Test passed!
    }
  });

  test('getByUser: should return valid response', async () => {
    expect(taskService.getByUser).toBeDefined();
    const resp = await taskService.getByUser(user);
    expect(resp).toBeInstanceOf(Array);
    resp.forEach((el) => {
      expect(el).toBeInstanceOf(Task);
      expect(el.id).toBeDefined();
      expect(el.user).toBeUndefined();
      expect(el.title).toBeDefined();
      expect(el.status).toBeDefined();
      expect(el.description).toBeDefined();
    });
  });

  test('getByUser: should fail for invalid input', async () => {
    try {
      await taskService.getByUser(null);
      throw 'Should fail!';
    } catch {
      // Test passed!
    }
  });

  test('getById: should return valid response', async () => {
    expect(taskService.getById).toBeDefined();
    const resp = await taskService.getById(storeTask.id);
    expect(resp).toBeInstanceOf(Task);
    expect(resp).toStrictEqual(storeTask);
  });

  test('getById: should fail for invalid input', async () => {
    try {
      await taskService.getById(null);
      throw 'Should fail!';
    } catch {
      // Test passed!
    }
  });

  test('remove: should return valid response', async () => {
    expect(taskService.remove).toBeDefined();
    await taskService.remove(storeTask);
  });

  test('remove: should fail for invalid input', async () => {
    try {
      await taskService.remove(null);
      throw 'Should fail!';
    } catch {
      // Test passed!
    }
  });
});
