import { Injectable } from '@angular/core';
import { HorizonService } from '../horizon-service/horizon.service';
import { UserService } from '../user-service/user.service';
import { Observable } from 'rxjs/Observable';

import { Log } from '../../models';

@Injectable()
export class LogsService {

  readonly logs$;

  constructor(private HorizonService: HorizonService,
              private UserService: UserService) {
    this.logs$ = this.HorizonService.table('logs');
  }

  log(text: string) {
    this.logs$.store(new Log(text, this.UserService.getUser()));
  }

  getAll(orderBy: string = 'stamp', limit: number = 50): Observable<Log[]> {
    return this.logs$
      .order(orderBy, 'descending')
      .limit(limit)
      .watch()
      .share();
  }
}
