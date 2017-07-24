export class StateObject {
  private id?: string;
  user: string;
  key: string;
  data?: any;
  constructor(state: StateObject) {
    this.id = `${state.user}.${state.key}`;
    this.user = state.user;
    this.key = state.key;
    this.data = state.data;
  }
}
