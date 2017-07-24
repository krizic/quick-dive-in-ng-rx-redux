import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HorizonService } from '../horizon-service/horizon.service';
import { UserService } from '../user-service/user.service';
import { StateObject } from './models/index';

@Injectable()
export class StateService {

  readonly state$;

  constructor(private HorizonService: HorizonService,
              private UserService: UserService) {
    this.state$ = this.HorizonService.table('state');
  }

  getState(state: StateObject): Observable<StateObject[]> {
   return this.state$.find(state).defaultIfEmpty();
  }

  saveState(key: string, data: any): void {
    this.state$.store(new StateObject({
      user: this.UserService.getUser(),
      key: key,
      data: data
    }));
  }
}




