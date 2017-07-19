import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

import { HorizonService } from '../../../../api/horizon-service';
import { Task } from '../../../../models/index';
import { UserService } from '../../../../api/user-service/user.service';

@Component({
  selector:    'app-task-add-rx',
  templateUrl: './task-add-rx.component.html',
  styleUrls:   ['./task-add-rx.component.scss']
})
export class TaskAddRxComponent {

  addTaskFormGroup: FormGroup;

  constructor(private HorizonService: HorizonService,
              private UserService: UserService) {
    this.initForm();
  }

  initForm() {
    this.addTaskFormGroup = new FormGroup({
      taskTitle:       new FormControl('', [Validators.minLength(1), Validators.maxLength(100), Validators.required]),
      taskDescription: new FormControl('', [Validators.maxLength(400)])
    });
  }

  onSubmit() {
    if (this.addTaskFormGroup.valid) {
      this.addTask(
        this.addTaskFormGroup.controls['taskTitle'].value,
        this.addTaskFormGroup.controls['taskDescription'].value,
        this.UserService.getUser()
      );
      this.addTaskFormGroup.reset();
    }
  }

  addTask(title: string, description: string, username: string) {
    this.HorizonService.table('tasks').store(new Task(title, description, username));
  }
}
