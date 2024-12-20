import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from '../../features/auth/services/login.service';
import { Constants } from '../common/constants';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.loginService.currentUser$.value) {
      this.router.navigate(['/auth/' + Constants.LOGIN_PATH]);
      return false;
    }
    return true;
  }
}
