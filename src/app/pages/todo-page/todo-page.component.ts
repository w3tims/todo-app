import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TasksState } from '../../state/tasks/tasks.state';
import { Observable } from 'rxjs';
import { ITask } from '../../typings/interfaces/task.interface';
import { LoadTasks } from '../../actions/tasks.actions';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit {

  @Select(TasksState.getTasks) tasks$: Observable<ITask[]>;

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.store.dispatch(LoadTasks);
  }

}
