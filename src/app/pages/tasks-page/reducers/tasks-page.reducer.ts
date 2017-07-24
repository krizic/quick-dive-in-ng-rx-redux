import { Action } from '@ngrx/store';
import { Task } from '../../../models/index';

export const UPDATE = 'TasksPage.Update';

export class Update implements Action {
  readonly type = UPDATE;

  constructor(public payload: Task) {
  }
}

export type AllActions = Update;
export const Actions = { UPDATE };

export function taskPageReducer(state: Task = JSON.parse(localStorage.getItem('tasks-state')), action: AllActions): Task {
  switch (action.type) {
    case Actions.UPDATE: {
      localStorage.setItem('tasks-state', JSON.stringify(action.payload));
      return Object.assign({}, state, action.payload);
    }
  }
}
