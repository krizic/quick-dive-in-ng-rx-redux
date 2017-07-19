import { Observable } from 'rxjs/';
import { Component, Input, OnInit } from '@angular/core';

import { Log } from '../../../../models';

@Component({
  selector:    'app-logs-timeline',
  templateUrl: './logs-timeline.component.html',
  styleUrls:   ['./logs-timeline.component.scss']
})
export class LogsTimelineComponent {

  @Input() logs$: Observable<Log[]>;

  dateToLocal(stamp: number) {
    return new Date(stamp).toLocaleTimeString();
  }
}
