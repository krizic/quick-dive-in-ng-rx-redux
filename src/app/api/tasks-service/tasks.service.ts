import { HorizonService } from '../horizon-service/horizon.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';


import { Task } from '../../models';

@Injectable()
export class TasksService {

  readonly tasks$;

  constructor(private HorizonService: HorizonService) {
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
    return this.tasks$.findAll(query)
      .order(orderBy, 'descending')
      .limit(limit)
      .watch()
      .share();
  }

  add(t: Task | Task[]): void {
    this.tasks$.store(t);
  }

  update(t: Task | Task[]): void {
    this.tasks$.update(t);
  }

  remove(t: Task | string) {
    this.tasks$.remove(t);
  }
}
