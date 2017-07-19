import {Injectable} from '@angular/core';
import * as Horizon from '@horizon/client';

@Injectable()
export class HorizonService {
  public table = Horizon({host: 'localhost:8181'});
}
