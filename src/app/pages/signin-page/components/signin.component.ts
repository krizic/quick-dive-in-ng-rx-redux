import { Component } from '@angular/core';
import { UserService } from '../../../api/user-service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  constructor(private UserService: UserService,
              private router: Router) { }

  onSignin(username: string) {
    if (username) {
      this.UserService.setUser(username);
      this.router.navigate(['/']);
    }
  }
}
