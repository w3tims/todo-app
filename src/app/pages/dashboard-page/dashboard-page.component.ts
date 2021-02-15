import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TasksState } from '../../state/tasks/tasks.state';
import { Observable } from 'rxjs';
import { LoadTasks } from '../../actions/tasks.actions';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  @Select(TasksState.getTasksTotalCount) tasksTotal$: Observable<number>;
  @Select(TasksState.getTasksOpenCount) tasksOpen$: Observable<number>;
  @Select(TasksState.getTasksClosedCount) tasksClosed$: Observable<number>;

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    // TODO move to route-resolvers ?
    this.store.dispatch(LoadTasks);
  }

  stringify(arg: any) {
    return String(arg);
  }
}
