import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { LoadingService } from '../../../../shared/services/loading.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../../core/data/models/user.model';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../../../shared/shared-standalone-imports';

@Component({
  selector: 'app-login',
  imports: [SHARED_IMPORTS],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private loginService: LoginService,
    private toastr: ToastrService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadingService.stopLoading();
    this.initForm();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loadingService.startLoading();
      const credentials = this.form.value;
      this.loginService.login(credentials).subscribe({
        next: (response: User) => {
          this.toastr.success(`Welcome ${response.fname} ${response.lname}`);
          this.router.navigate(['/home/users']);
          this.loadingService.stopLoading();
        },
      });
    }
  }

  // private methods
  private initForm(): void {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
}
