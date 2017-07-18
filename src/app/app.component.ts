import { Component } from '@angular/core';
import { HorizonService } from './horizon.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  tasks$: Observable<any>;

  constructor(private HorizonService: HorizonService) {
    this.tasks$ = this.HorizonService.table('tasks').watch();
    this.initDemoTasks();
  }

  initDemoTasks() {
    this.HorizonService.table('tasks').store(new Task('Demo Task'));
  }
}

export class Task {
  title?: string;
  stamp?: number = + new Date();
  user?: any;
  done?: boolean;
  tags?: string [] = [];

  constructor(title: string = 'Unnamed task') {
    this.title = title;
  }
}
