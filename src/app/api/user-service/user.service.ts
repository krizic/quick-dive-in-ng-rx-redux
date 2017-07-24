import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor() {
  }

  setUser(username: string): void {
    localStorage.setItem('demo-username', username);
  }

  getUser(): string {
    return localStorage.getItem('demo-username');
  }

  checkIfLogged(): boolean {
    return this.getUser() ? true : false;
  }
}
