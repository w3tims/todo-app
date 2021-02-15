import { ITask } from '../typings/interfaces/task.interface';
import { TaskSortField } from '../typings/enums/task-sort-field.enum';

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

export class SetSortField {
  static readonly type = '[Tasks] Set Sort Field';
  constructor(public payload: TaskSortField) {}
}
