import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { TasksService } from './tasks.service';
import { ITask } from '../../typings/interfaces/task.interface';
import { CreateTask, DeleteTask, LoadTasks, SetSearchText, SetSortField, UpdateTask } from '../../actions/tasks.actions';
import { Injectable } from '@angular/core';
import { TaskSortField } from '../../typings/enums/task-sort-field.enum';

export class TasksStateModel {
  tasks: ITask[];
  sortField: TaskSortField;
  searchText: string;
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
}

@State<TasksStateModel>({
  name: 'tasks',
  defaults: {
    tasks: [],
    sortField: TaskSortField.CreationDate,
    searchText: '',
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
    const searchText = state.searchText;
    const tasks =  [ ...state.tasks ];
    const sortedTasks = tasks.sort((task1, task2) => {
      const date1 = +new Date(task1[sortField]);
      const date2 = +new Date(task2[sortField]);
      return date1 - date2;
    });
    try {
      // quickfix of slashes in input ( breaks regex)
      return sortedTasks.filter(task => task.text.match(searchText));
    } catch (e) {
      return [];
    }
  }

  @Selector()
  static getSortField(state: TasksStateModel) {
    return  state.sortField;
  }

  @Selector()
  static getSearchText(state: TasksStateModel) {
    return state.searchText;
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
  updateTask({getState, patchState}: StateContext<TasksStateModel>, {payload}: UpdateTask) {
    return this.tasksService.updateTask(payload)
      .pipe(
        tap((result) => {
          const state = getState();
          const tasks = state.tasks.map(
            task => task.id === payload.id ? result : task
          );
          patchState({
            ...state,
            tasks,
          });
        })
      );
  }


  @Action(DeleteTask)
  deleteTask({getState, patchState}: StateContext<TasksStateModel>, {id}: DeleteTask) {
    return this.tasksService.deleteTask(id)
      .pipe(
        tap(() => {
          const state = getState();
          const tasks = state.tasks.filter(item => item.id !== id);
          patchState({
            ...state,
            tasks,
          });
        })
      );
  }

  @Action(SetSortField)
  setSortField({getState, patchState}: StateContext<TasksStateModel>, {payload}: SetSortField) {
    const state = getState();
    patchState({
      ...state,
      sortField: payload
    });
  }

  @Action(SetSearchText)
  setSearchText({getState, patchState}: StateContext<TasksStateModel>, {payload}: SetSearchText) {
    const state = getState();
    patchState({
      ...state,
      searchText: payload
    });
  }
}
