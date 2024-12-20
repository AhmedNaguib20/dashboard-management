import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadingStatus } from '../../core/common/enum';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  // private fields
  private loadingStatus = new Subject<LoadingStatus>();

  // public fields
  public loadingStatus$ = this.loadingStatus.asObservable();

  constructor() {}

  // actions
  public startLoading(isTransparent = true) {
    if (isTransparent === true) {
      this.loadingStatus.next(LoadingStatus.VisibleTransparent);
    } else {
      this.loadingStatus.next(LoadingStatus.Visible);
    }
  }

  public stopLoading() {
    this.loadingStatus.next(LoadingStatus.Hidden);
  }
}
