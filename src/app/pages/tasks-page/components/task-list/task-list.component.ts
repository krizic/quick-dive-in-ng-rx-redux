import { Observable } from 'rxjs/';
import { Component, Input, OnInit } from '@angular/core';

import { TasksService } from '../../../../api/tasks-service/tasks.service';
import { Task } from '../../../../models';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as Actions from '../../reducers/tasks-page.reducer';

@Component({
  selector:    'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls:   ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  formQueried$: Observable<Task[][]>;
  @Input() state$: Observable<Task>;

  totalShown: number;

  filterFormGroup: FormGroup;

  constructor(private TasksService: TasksService,
              private store: Store<any>) {

    this.filterFormGroup = new FormGroup({
      title: new FormControl(''),
      user:  new FormControl(''),
      done:  new FormControl('')
    });
  }

  ngOnInit(): void {

    this.state$.subscribe((state: Task = {}) => {
      this.filterFormGroup.patchValue(state);
    });

    /**
     * this.state$:                    f---------f---------------f----f---------f----->
     * tasks$.watch():                 --------------------f-------------------------->
     * combineLatest:                  {f}-------{f}-------{f}---{f}--{f}-------{f}--->
     * switchMap:                      \         \         \     \    \         \
     * TasksService.findAll            [r]------|[r]------|[r]--|[r]-|[r]-------[r]--->
     * let(this.getItemsGrouped()):    [[r]]-----[[r]]-----[[r]]-[[r]][[r]]-----[[r]]->
     */
    this.formQueried$ = this.state$
      .distinctUntilChanged()
      .combineLatest(Observable.merge(this.TasksService.tasks$.watch({rawChanges: true})), (form: Task, changes) => {
        return form;
      })
      .switchMap((form = {}) => {
        const plucked = {};
        Object.keys(form).forEach((key) => {
          if (form[key] !== null && form[key] !== '') {
            plucked[key] = form[key];
          }
        });
        return Observable.merge(this.TasksService.findAll(plucked, 'creationStamp', 25));
      })
      .let(this.getItemsGrouped());

    /**
     * filterFormGroup.valueChanges:   ----ff-ffff----------ff-f-f----f------ffff----->
     * debounceTime:                   f---------f---------------f----f---------f----->
     */
    this.filterFormGroup.valueChanges
      .debounceTime(300)
      .subscribe((values: Task) => {
        this.store.dispatch(new Actions.Update(values));
      });
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

