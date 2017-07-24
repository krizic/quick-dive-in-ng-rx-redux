import { Component } from '@angular/core';
import { LogsService } from '../../api/logs-service/logs.service';
import { Observable } from 'rxjs/Observable';
import { Log } from '../../models/index';
import { Task } from 'protractor/built/taskScheduler';
import { Store } from '@ngrx/store';
import * as Actions from './reducers/tasks-page.reducer';

@Component({
  selector:    'app-tasks-page',
  templateUrl: './tasks-page.component.html'
})

export class TasksPageComponent {

  logs$: Observable<Log[]>;
  tasksPageState$: Observable<Task>;

  constructor(private LogsService: LogsService,
              private store: Store<any>) {
    this.tasksPageState$ = store.select('tasksPage');
    this.logs$ = this.LogsService.getAll();

    this.store.dispatch(new Actions.Update({}));
  }
}
