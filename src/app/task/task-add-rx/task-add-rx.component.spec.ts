import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAddRxComponent } from './task-add-rx.component';

describe('TaskAddRxComponent', () => {
  let component: TaskAddRxComponent;
  let fixture: ComponentFixture<TaskAddRxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskAddRxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAddRxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
