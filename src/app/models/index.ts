export class Task {
  id?: string;
  title?: string;
  description?: string;
  creationStamp?: number = + new Date();
  doneStamp?: number;
  user?: any;
  done = false;
  tags?: string [] = [];

  constructor(title: string = 'Unnamed task', description: string = 'No Description', user: string = '') {
    this.title = title;
    this.description = description;
    this.user = user;
  }
}
