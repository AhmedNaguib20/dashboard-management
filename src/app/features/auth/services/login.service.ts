import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../../../core/common/constants';
import UserMapper from '../../../core/data/mappers/user-mapper';
import { User } from '../../../core/data/models/user.model';
import { JwtDecoderService } from '../../../core/services/jwt-decoder.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public currentUser$: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private userMapper: UserMapper,
    private jwtDecoderService: JwtDecoderService
  ) {
    if (this.jwtDecoderService.getCurrentUserFromJWTToken()) {
      this.currentUser$.next(this.jwtDecoderService.getCurrentUserFromJWTToken());
    }
  }

  login(credentials: { username: string; password: string }): Observable<User> {
    return this.http
      .post<{ accessToken: string; user: User }>(
        Constants.LOGIN_API,
        credentials
      )
      .pipe(
        tap((response: { accessToken: string; user: User }) => {
          this.jwtDecoderService.saveToken(response.accessToken);
          this.jwtDecoderService.saveUser(
            this.userMapper.fromJson(response?.user)
          );
          
          this.currentUser$.next(this.userMapper.fromJson(response?.user));
        }),
        map((response) => this.userMapper.fromJson(response?.user))
      );
  }

  logout(): void {
    this.jwtDecoderService.removeCurrentUser();
    this.currentUser$.next(null);
  }
}
