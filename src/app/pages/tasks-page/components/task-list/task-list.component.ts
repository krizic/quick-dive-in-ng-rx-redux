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

  queriedGroupedTasks$: Observable<Task[][]>;
  initGroupedTasks$: Observable<Task[][]>;
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
     * filterFormGroup.valueChanges:   -fffff-ffff---ff-ffff-----f----f------ffff----->
     * debounceTime:                   ----------f---------------f----f---------f----->
     * tasks$.watch():                 --------------------f-------------------------->
     * combineLatest:                  ----------{f}-------{f}---{}---{f}-------{}---->
     * switchMap:                                \         \     \    \         \
     * TasksService.findAll                      [r]------|[r]--|[r]-|[r]-------[r]--->
     * let(this.getItemsGrouped()):    ----------[[r]]-----[[r]]-[[r]][[r]]-----[[r]]->
     */
    this.formQueried$ = this.filterFormGroup.valueChanges
      .debounceTime(300)
      .combineLatest(this.TasksService.tasks$.watch(), (form: Task) => {
        const plucked = {};
        Object.keys(form).forEach((key) => {
          if (form[key] !== null && form[key] !== '') {
            plucked[key] = form[key];
          }
        });
        return plucked;
      })
      .switchMap((form) => {
        return this.TasksService.findAll(form, 'creationStamp', 25);
      })
      .let(this.getItemsGrouped());

    /**
     * this.TasksService.findAll:     ---[r]--------[r]-------[r]------[r]---->
     * first:                         ---[r]-|
     * let(this.getItemsGrouped()):   ---[[r]]-|
     */
    this.initGroupedTasks$ = Observable.merge(this.TasksService.findAll({}, 'creationStamp', 25))
      .first()
      .let(this.getItemsGrouped());


    /**
     * formQueried$:                   ----------------[[r]]--------[[r]]--->
     * initGroupedTasks$:              [[r]]-|
     * merge:                          [[r]]-----------[[r]]--------[[r]]--->
     */
    this.queriedGroupedTasks$ = this.formQueried$.merge(this.initGroupedTasks$);
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

