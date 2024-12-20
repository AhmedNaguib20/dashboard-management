import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../../features/auth/services/login.service';
import { Constants } from '../common/constants';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}


  canActivate(): boolean {
    if (this.loginService.currentUser$.value) {
      console.log('test2');

      this.router.navigate(['/home/' +Constants.USERS_PATH]);
      return false;
    }
    console.log('test4');

    return true;
  }
}
