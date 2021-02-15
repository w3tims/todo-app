// import {State, Action, StateContext, Selector} from '@ngxs/store';
// import {tap} from 'rxjs/operators';
// import { TasksService } from './tasks.service';
// import { ITask } from '../../typings/interfaces/task.interface';
// import { CreateTask, DeleteTask, LoadTasks, SetSelectedTask, UpdateTask } from '../../actions/tasks.actions';
// import { Injectable } from '@angular/core';
//
// export class TasksStateModel {
//   tasks: ITask[];
//   selectedTask: ITask;
// }
//
// @State<TasksStateModel>({
//   name: 'tasks',
//   defaults: {
//     tasks: [],
//     selectedTask: null
//   }
// })
// @Injectable()
// export class AuthState {
//
//   constructor(private tasksService: TasksService) {}
//
//   @Selector()
//   static getTasks(state: TasksStateModel) {
//     return state.tasks;
//   }
//
//
//   @Selector()
//   static getTasksTotalCount(state: TasksStateModel) {
//     return state.tasks.length;
//   }
//
//   @Selector()
//   static getTasksOpenCount(state: TasksStateModel) {
//     return state.tasks.filter(task => !task.closed).length;
//   }
//
//   @Selector()
//   static getTasksClosedCount(state: TasksStateModel) {
//     return state.tasks.filter(task => task.closed).length;
//   }
//
//   @Selector()
//   static getSelectedTask(state: TasksStateModel) {
//     return state.selectedTask;
//   }
//
//   @Action(LoadTasks)
//   loadTasks({getState, setState}: StateContext<TasksStateModel>) {
//     return this.tasksService.loadTasks().pipe(
//       tap((tasks) => {
//         const state = getState();
//         setState({
//           ...state,
//           tasks,
//         });
//       }));
//   }
//
//   @Action(CreateTask)
//   createTask({getState, patchState}: StateContext<TasksStateModel>, {payload}: CreateTask) {
//     return this.tasksService.createTask(payload)
//       .pipe(
//         tap((result) => {
//           const state = getState();
//           patchState({
//             tasks: [...state.tasks, result]
//           });
//         })
//       );
//   }
//
//   @Action(UpdateTask)
//   updateTask({getState, setState}: StateContext<TasksStateModel>, {payload}: UpdateTask) {
//     return this.tasksService.updateTask(payload)
//       .pipe(
//         tap((result) => {
//           const state = getState();
//           const tasks = state.tasks.map(
//             task => task.id === payload.id ? result : task
//           );
//           setState({
//             ...state,
//             tasks,
//           });
//         })
//       );
//   }
//
//
//   @Action(DeleteTask)
//   deleteTask({getState, setState}: StateContext<TasksStateModel>, {id}: DeleteTask) {
//     return this.tasksService.deleteTask(id)
//       .pipe(
//         tap(() => {
//           const state = getState();
//           const tasks = state.tasks.filter(item => item.id !== id);
//           setState({
//             ...state,
//             tasks,
//           });
//         })
//       );
//   }
//
//   @Action(SetSelectedTask)
//   setSelectedTodoId({getState, setState}: StateContext<TasksStateModel>, {payload}: SetSelectedTask) {
//     const state = getState();
//     setState({
//       ...state,
//       selectedTask: payload
//     });
//   }
// }
