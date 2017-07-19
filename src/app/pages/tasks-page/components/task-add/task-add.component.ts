import { Component } from '@angular/core';
import { Task } from '../../../../models/index';
import { HorizonService } from '../../../../api/horizon-service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent {

  constructor(private HorizonService: HorizonService) {
    this.addTask('Demo Task');
  }

  onEnter(value: string) {
    this.addTask(value);
  }

  addTask(title: string) {
    this.HorizonService.table('tasks').store(new Task(title));
  }
}
