import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from '../../services/loading.service';
import { LoadingStatus } from '../../../core/common/enum';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-loading',
  imports: [SpinnerComponent],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  standalone: true,
})
export class LoadingComponent implements OnInit {
  @ViewChild('loadingOverlayPage', { static: true })
  loadingOverlayPage: ElementRef;
  isHidden$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private renderer: Renderer2,
    private loadService: LoadingService
  ) {}

  ngOnInit() {
    this.loadService.loadingStatus$.subscribe((status: LoadingStatus) => {
      switch (status) {
        case LoadingStatus.Hidden:
          this.hide();
          break;

        case LoadingStatus.Visible:
          this.showNotTransparent();
          break;

        case LoadingStatus.VisibleTransparent:
          this.showTransparent();
          break;
      }
    });
  }

  showNotTransparent() {
    this.renderer.setStyle(
      this.loadingOverlayPage.nativeElement,
      'background',
      '#FFFFFF'
    );
    this.isHidden$.next(false);
  }

  showTransparent() {
    this.renderer.setStyle(
      this.loadingOverlayPage.nativeElement,
      'background',
      '#40404033'
    );
    this.isHidden$.next(false);
  }

  hide() {
    this.isHidden$.next(true);
    this.renderer.addClass(this.loadingOverlayPage.nativeElement, 'hidden');
  }
}
