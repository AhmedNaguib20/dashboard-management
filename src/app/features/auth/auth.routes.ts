import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from '../../core/guards/login.guard';
import { Constants } from '../../core/common/constants';

export default [
  {
    path: Constants.LOGIN_PATH,
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
] as Routes;
