import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { TasksService } from './tasks.service';
import { ITask } from '../../typings/interfaces/task.interface';
import { CreateTask, DeleteTask, LoadTasks, SetSortField, UpdateTask } from '../../actions/tasks.actions';
import { Injectable } from '@angular/core';
import { TaskSortField } from '../../typings/enums/task-sort-field.enum';

export class TasksStateModel {
  tasks: ITask[];
  sortField: TaskSortField;
  // tasksLoading: boolean;
  // tasksLoadSuccess: boolean;
  // tasksLoadError: any;
  //
  // taskUpdating: boolean;
  // taskUpdateSuccess: boolean;
  // taskUpdateError: any;
  //
  // taskDeleting: boolean;
  // taskDeleteSuccess: boolean;
  // taskDeleteError: any;

  // selectedTask: ITask;
  // createPopupOpen: boolean;
}

@State<TasksStateModel>({
  name: 'tasks',
  defaults: {
    tasks: [],
    sortField: TaskSortField.CreationDate,
    // tasksLoading: false,
    // tasksLoadSuccess: false,
    // tasksLoadError: null,
    //
    // taskUpdating: false,
    // taskUpdateSuccess: false,
    // taskUpdateError: null,
    //
    // taskDeleting: false,
    // taskDeleteSuccess: false,
    // taskDeleteError: null,

    // selectedTask: null,
    // createPopupOpen: false
  }
})
@Injectable()
export class TasksState {

  constructor(
    private tasksService: TasksService
  ) {}

  @Selector()
  static getTasks(state: TasksStateModel) {
    const sortField = state.sortField;
    const tasks =  [ ...state.tasks ];
    return tasks.sort((task1, task2) => {
      const date1 = +new Date(task1[sortField]);
      const date2 = +new Date(task2[sortField]);
      return date1 - date2;
    });
  }

  @Selector()
  static getSortField(state: TasksStateModel) {
    return  state.sortField;
  }

  @Selector()
  static getTasksTotalCount(state: TasksStateModel) {
    return state.tasks.length;
  }

  @Selector()
  static getTasksOpenCount(state: TasksStateModel) {
    return state.tasks.filter(task => !task.closed).length;
  }

  @Selector()
  static getTasksClosedCount(state: TasksStateModel) {
    return state.tasks.filter(task => task.closed).length;
  }

  @Action(LoadTasks)
  loadTasks({getState, setState}: StateContext<TasksStateModel>) {
    return this.tasksService.loadTasks().pipe(
      tap((tasks) => {
        const state = getState();
        setState({
          ...state,
          tasks,
        });
      }));
  }

  @Action(CreateTask)
  createTask({getState, patchState}: StateContext<TasksStateModel>, {payload}: CreateTask) {
    return this.tasksService.createTask(payload)
      .pipe(
        tap((result) => {
          const state = getState();
          patchState({
            tasks: [...state.tasks, result]
          });
        })
      );
  }

  @Action(UpdateTask)
  updateTask({getState, setState}: StateContext<TasksStateModel>, {payload}: UpdateTask) {
    return this.tasksService.updateTask(payload)
      .pipe(
        tap((result) => {
          const state = getState();
          const tasks = state.tasks.map(
            task => task.id === payload.id ? result : task
          );
          setState({
            ...state,
            tasks,
          });
        })
      );
  }


  @Action(DeleteTask)
  deleteTask({getState, setState}: StateContext<TasksStateModel>, {id}: DeleteTask) {
    return this.tasksService.deleteTask(id)
      .pipe(
        tap(() => {
          const state = getState();
          const tasks = state.tasks.filter(item => item.id !== id);
          setState({
            ...state,
            tasks,
          });
        })
      );
  }

  @Action(SetSortField)
  setSortField({getState, setState}: StateContext<TasksStateModel>, {payload}: SetSortField) {
    const state = getState();
    setState({
      ...state,
      sortField: payload
    });
  }
}
