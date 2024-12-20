import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/data/models/user.model';
import { LoginService } from '../../../features/auth/services/login.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-header',
  imports: [NzIconModule, NzDrawerModule, SideBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent implements OnInit {
  public currentUser: User = null;
  public showSideBarDrawer: boolean = false;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.currentUser = this.loginService.currentUser$.value;
  }

  open(): void {
    this.showSideBarDrawer = true;
  }

  close(): void {
    this.showSideBarDrawer = false;
  }
}
