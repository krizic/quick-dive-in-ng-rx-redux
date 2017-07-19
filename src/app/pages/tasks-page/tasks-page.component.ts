import { Component } from '@angular/core';
import { LogsService } from '../../api/logs-service/logs.service';
import { Observable } from 'rxjs/Observable';
import { Log } from '../../models/index';

@Component({
  selector:    'app-tasks-page',
  templateUrl: './tasks-page.component.html'
})

export class TasksPageComponent {

  logs$: Observable<Log[]>;

  constructor(private LogsService: LogsService) {
    this.logs$ = this.LogsService.getAll();
  }
}
