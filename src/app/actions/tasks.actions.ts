import { ITask } from '../typings/interfaces/task.interface';

export class CreateTask {
  static readonly type = '[Tasks] Create';
  constructor(public payload: ITask) {}
}

export class LoadTasks {
  static readonly type = '[Tasks] Load All';
}

export class UpdateTask {
  static readonly type = '[Tasks] Update';
  constructor(public payload: ITask) {}
}

export class DeleteTask {
  static readonly type = '[Tasks] Delete';
  constructor(public id: string) {}
}

export class SetSelectedTask {
  static readonly type = '[Tasks] Set';
  constructor(public payload: ITask) {}
}
