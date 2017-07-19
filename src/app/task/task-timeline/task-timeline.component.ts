import { Observable } from 'rxjs/';
import { Component } from '@angular/core';

import { TasksService } from '../../api/tasks-service/tasks.service';
import { Task } from '../../models';

@Component({
  selector: 'app-task-timeline',
  templateUrl: './task-timeline.component.html',
  styleUrls: ['./task-timeline.component.scss']
})
export class TaskTimelineComponent {

  activeTasks$: Observable<Task[]>;
  doneTasks$: Observable<Task[]>;
  totalShown$: Observable<number>;

  constructor(private TasksService: TasksService) {
    this.activeTasks$ = this.TasksService.findAll({done: false}, 'creationStamp', 25);
    this.doneTasks$ = this.TasksService.findAll({done: true}, 'doneStamp', 25);

    this.totalShown$ = Observable.combineLatest(this.activeTasks$, this.doneTasks$, (active, inactive) => {
      return active.length + inactive.length;
    });
  }

  onRemove(task: Task) {
    this.TasksService.remove(task);
  }

  onToggle(task: Task) {
    this.TasksService.update({
      id: task.id,
      done: !task.done,
      doneStamp: + new Date()
    });
  }
}
