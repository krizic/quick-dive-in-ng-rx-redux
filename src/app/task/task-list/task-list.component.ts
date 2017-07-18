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

  activeTasks$: Observable<Task[]>;
  doneTasks$: Observable<Task[]>;

  constructor(private HorizonService: HorizonService) {
    this.activeTasks$ = this.HorizonService.table('tasks')
      .findAll({ done: false })
      .order('creationStamp', 'descending')
      .limit(25)
      .watch()
      .share();

    this.doneTasks$ = this.HorizonService.table('tasks')
      .findAll({ done: true })
      .order('doneStamp', 'descending')
      .limit(25)
      .watch()
      .share();
  }

  onToggle(task: Task) {
    this.HorizonService.table('tasks').update({
        id: task.id,
        done: !task.done,
        doneStamp: + new Date()
      });
  }
}
