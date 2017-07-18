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
