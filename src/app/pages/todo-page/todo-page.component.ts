import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TasksState } from '../../state/tasks/tasks.state';
import { Observable } from 'rxjs';
import { ITask } from '../../typings/interfaces/task.interface';
import { CreateTask, DeleteTask, LoadTasks, SetSortField, UpdateTask } from '../../actions/tasks.actions';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from './task-form/task-form.component';
import { filter, tap } from 'rxjs/operators';
import { TaskSortField } from '../../typings/enums/task-sort-field.enum';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit {

  @Select(TasksState.getTasks) tasks$: Observable<ITask[]>;
  @Select(TasksState.getSortField) sortField$: Observable<TaskSortField>;

  taskFormDialogConfig = {
    width: '320px',
  };

  sortOptions = [
    {
      name: 'Creation date',
      value: TaskSortField.CreationDate
    },
    {
      name: 'Due date',
      value: TaskSortField.DueDate
    },
  ];

  constructor(
    private store: Store,
    private dialog: MatDialog,
  ) { }

  setSortField(newSortField: TaskSortField) {
    this.store.dispatch(new SetSortField(newSortField));
  }

  createTaskPopup() {
    const dialogRef = this.dialog.open(
      TaskFormComponent, { ...this.taskFormDialogConfig }
    );
    dialogRef.afterClosed()
      .pipe(
        filter(taskCreated => Boolean(taskCreated)),
        tap(taskCreated => this.store.dispatch(new CreateTask(taskCreated)))
      )
      .subscribe();
  }

  editTaskPopup(task: ITask) {
    const dialogRef = this.dialog.open(
      TaskFormComponent, { ...this.taskFormDialogConfig, data: task }
    );
    dialogRef.afterClosed()
      .pipe(
        filter(taskEdited => Boolean(taskEdited)),
        tap(taskEdited => this.store.dispatch(new UpdateTask(taskEdited)))
      )
      .subscribe();
  }

  deleteTask(task: ITask) {
    this.store.dispatch(new DeleteTask(task.id));
  }

  // use for table-view
  toReadableDate(date: Date): string{
    if (!date) { return ''; }
    const dateValue = new Date(date);
    return ('0' + dateValue.getDate()).slice(-2) + '.'
      + ('0' + (dateValue.getMonth() + 1)).slice(-2) + '.'
      + dateValue.getFullYear();
  }

  ngOnInit() {
    this.store.dispatch(LoadTasks);
  }
}
