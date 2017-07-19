import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../api/user-service/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private UserService: UserService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.UserService.checkIfLogged()) {
      return true;
    }
    // not logged in so redirect to login page with the return url and return false
    this.router.navigate(['/signin']);
    return false;
  }
}
