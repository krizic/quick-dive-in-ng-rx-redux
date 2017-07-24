import { Observable } from 'rxjs/';
import { Component } from '@angular/core';

import { TasksService } from '../../../../api/tasks-service/tasks.service';
import { Task } from '../../../../models';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector:    'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls:   ['./task-list.component.scss']
})
export class TaskListComponent {

  formQueried$: Observable<Task[][]>;

  totalShown: number;

  filterFormGroup: FormGroup;

  constructor(private TasksService: TasksService) {

    this.filterFormGroup = new FormGroup({
      title: new FormControl(''),
      user:  new FormControl(''),
      done:  new FormControl('')
    });

    /**
     * filterFormGroup.valueChanges:   ----ff-ffff----------ff-f-f----f------ffff----->
     * startWith:                      f---------------------------------------------->
     * debounceTime:                   f---------f---------------f----f---------f----->
     * tasks$.watch():                 --------------------f-------------------------->
     * combineLatest:                  {f}-------{f}-------{f}---{f}--{f}-------{f}--->
     * switchMap:                      \         \         \     \    \         \
     * TasksService.findAll            [r]------|[r]------|[r]--|[r]-|[r]-------[r]--->
     * let(this.getItemsGrouped()):    [[r]]----[[r]]-----[[r]]-[[r]][[r]]-----[[r]]->
     */
    this.formQueried$ = this.filterFormGroup.valueChanges
      .startWith({})
      .debounceTime(300)
      .combineLatest(Observable.merge(this.TasksService.tasks$.watch()), (form: Task, changes) => {
        const plucked = {};
        Object.keys(form).forEach((key) => {
          if (form[key] !== null && form[key] !== '') {
            plucked[key] = form[key];
          }
        });
        return plucked;
      })
      .switchMap((form) => Observable.merge(this.TasksService.findAll(form, 'creationStamp', 25)))
      .let(this.getItemsGrouped());
  }

  getItemsGrouped = () => {
    /**
     * source:  ------[r]-------[r]---------[r]--->
     * map:     ------[[r]]-----[[r]]-------[[r]]->
     */
    return (source: Observable<Task[]>) =>
      source.do((tasks) => {
        this.totalShown = tasks.length;
      })
        .map((tasks) => {
          return tasks.reduce((acc, current, index) => {
            if (index > 0) {
              const groupBy = 4;
              const currentGroup = Math.trunc(index / groupBy);
              const currentItemInGroup = index % groupBy;

              if (currentItemInGroup === 0) {
                acc.push([]);
              }
              acc[currentGroup][currentItemInGroup] = current;
              return acc;
            } else {
              acc[index][0] = current;
              return acc;
            }
          }, [[]]);
        });
  }

  onToggle(task: Task) {
    this.TasksService.update({
      id:        task.id,
      done:      !task.done,
      doneStamp: +new Date()
    });
  }
}

