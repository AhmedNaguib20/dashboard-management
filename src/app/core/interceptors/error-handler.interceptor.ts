import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { JwtDecoderService } from '../services/jwt-decoder.service';
import { LoadingService } from '../../shared/services/loading.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private jwtDecoderService: JwtDecoderService,
    private loadingService: LoadingService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unexpected error occurred.';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          switch (error.status) {
            case 400:
              errorMessage = 'Invalid request. Please check your input.';
              break;
            case 401:
              errorMessage = 'Unauthorized. Invalid email or password.';
              this.jwtDecoderService.removeCurrentUser();
              break;
            case 403:
              errorMessage = 'Invalid Access Token.';
              this.jwtDecoderService.removeCurrentUser();
              break;
            case 500:
              errorMessage = 'Internal server error. Please try again later.';
              break;
            default:
              this.loadingService.stopLoading();
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
        }

        this.toastr.error(errorMessage);

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
