import { Injectable } from '@angular/core';
import { Constants } from '../common/constants';
import UserMapper from '../data/mappers/user-mapper';
import { User } from '../data/models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class JwtDecoderService {
  constructor(private userMapper: UserMapper, private router: Router) {}

  saveToken(token: string) {
    if (token) {
      localStorage.setItem(Constants.AUTH_TOKEN, token);
    }
  }

  removeCurrentToken() {
    localStorage.removeItem(Constants.AUTH_TOKEN);
  }

  getDecodedUser(): User {
    const user = JSON.parse(localStorage.getItem(Constants.DASHBOARD_USER));
    if (!user) {
      return null;
    }
    return this.userMapper.fromJson(user);
  }

  getCurrentUserFromJWTToken() {
    const payloadMap = this.getDecodedUser();
    if (payloadMap != null) {
      return this.userMapper.fromJson(payloadMap);
    }
    return null;
  }

  saveUser(user: User) {
    if (user) {
      localStorage.setItem(Constants.DASHBOARD_USER, JSON.stringify(user));
    }
  }

  removeCurrentUser() {
    localStorage.removeItem(Constants.DASHBOARD_USER);
    localStorage.removeItem(Constants.AUTH_TOKEN);
    window.location.reload();
  }
}
