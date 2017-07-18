import { Component } from '@angular/core';
import { HorizonService } from '../../horizon.service';
import { Observable } from 'rxjs/Observable';
import { Task } from '../models';

@Component({
  selector:    'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls:   ['./task-list.component.scss']
})
export class TaskListComponent {

  tasks$: Observable<any>;

  constructor(private HorizonService: HorizonService) {
    this.tasks$ = this.HorizonService.table('tasks').watch();
    this.initDemoTasks();
  }

  initDemoTasks() {
    this.HorizonService.table('tasks').store(new Task('Demo Task'));
  }
}
