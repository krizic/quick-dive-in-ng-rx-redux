import { Observable } from 'rxjs/';
import { Component } from '@angular/core';

import { TasksService } from '../../../../api/tasks-service/tasks.service';
import { Task } from '../../../../models';

@Component({
  selector:    'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls:   ['./task-list.component.scss']
})
export class TaskListComponent {

  groupedTasks$: Observable<Task[][]>;
  totalShown: number;

  constructor(private TasksService: TasksService) {
    this.groupedTasks$ = this.TasksService.getAll('creationStamp', 25)
      .do((tasks) => {
        this.totalShown = tasks.length;
      })
      .map((tasks) => {
      return tasks.reduce((acc, current, index) => {
        if (index > 0) {
          const groupBy = 4;
          const currentGroup = Math.trunc(index / groupBy);
          const currentItemInGroup = index % groupBy;

          if (currentItemInGroup === 0) {
            acc.push([]);
          }
          acc[currentGroup][currentItemInGroup] = current;
          return acc;
        } else {
          acc[index][0] = current;
          return acc;
        }
      }, [[]]);
    });
  }

  onToggle(task: Task) {
    this.TasksService.update({
        id: task.id,
        done: !task.done,
        doneStamp: + new Date()
      });
  }
}

