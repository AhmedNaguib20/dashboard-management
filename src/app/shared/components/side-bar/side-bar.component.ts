import { Component, OnInit } from '@angular/core';
import { NgSimpleAvatarModule } from 'ng-simple-avatar';
import { LoginService } from '../../../features/auth/services/login.service';
import { User } from '../../../core/data/models/user.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [NgSimpleAvatarModule, RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
  standalone: true,
})
export class SideBarComponent implements OnInit {
  public currentUser: User = null;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.currentUser = this.loginService.currentUser$.value;
  }

  onLogout(): void {
    this.loginService.logout();
    this.router.navigate(['/auth/login']);
  }
}
