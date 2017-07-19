import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTimelineComponent } from './task-timeline.component';

describe('TaskTimelineComponent', () => {
  let component: TaskTimelineComponent;
  let fixture: ComponentFixture<TaskTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
