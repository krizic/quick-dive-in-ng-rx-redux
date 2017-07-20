import { HorizonService } from '../horizon-service/horizon.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';


import { Task } from '../../models';
import { LogsService } from '../logs-service/logs.service';

@Injectable()
export class TasksService {

  readonly tasks$;

  constructor(private HorizonService: HorizonService,
              private LogsService: LogsService) {
    this.tasks$ = this.HorizonService.table('tasks');
  }

  getAll(orderBy: string = 'creationStamp', limit: number = 100): Observable<Task[]> {
    return this.tasks$
      .order(orderBy, 'descending')
      .limit(limit)
      .watch()
      .share();
  }

  findAll(query: Task, orderBy: string = 'creationStamp', limit: number = 100): Observable<Task[]> {
    if (Object.keys(query).length) {
      return this.tasks$.findAll(query)
        .order(orderBy, 'descending')
        .limit(limit)
        .watch()
        .share();
    } else {
      return this.getAll(orderBy, limit);
    }
  }

  add(t: Task | Task[]): void {
    this.tasks$.store(t);
    this.LogsService.log('New task was added');
  }

  update(t: Task | Task[]): void {
    this.tasks$.update(t);
    this.LogsService.log('Task was updated');
  }

  remove(t: Task | string) {
    this.tasks$.remove(t);
    this.LogsService.log('Task was removed');
  }
}
