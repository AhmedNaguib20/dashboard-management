import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../services/login.service';
import { LoadingService } from '../../../../shared/services/loading.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../../core/data/models/user.model';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzUploadModule,
    NzIconModule,
  ],
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
