import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UsersService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '../../../../core/common/constants';
import { User } from '../../../../core/data/models/user.model';
import { LoadingService } from '../../../../shared/services/loading.service';

@Component({
  selector: 'app-add-edit-user',
  imports: [
    NzModalModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzUploadModule,
    NzIconModule,
  ],
  templateUrl: './add-edit-user.component.html',
  styleUrl: './add-edit-user.component.scss',
  standalone: true,
})
export class AddEditUserComponent implements OnInit {
  @Input() selectedUser: User;
  @Output() closeModal = new EventEmitter<void>();
  public form: FormGroup = new FormGroup({});
  public fileList: NzUploadFile[] = [];

  constructor(
    private usersService: UsersService,
    private toastr: ToastrService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  onCloseModal(): void {
    this.closeModal.emit();
  }

  submitForm(): void {
    this.loadingService.startLoading();
    if (this.selectedUser) {
      this.usersService
        .updateUser({
          ...this.form.value,
          id: this.selectedUser.id,
          avatar: 'https://placehold.co/60x40',
        })
        .subscribe((response) => {
          this.closeModal.emit();
          this.toastr.success(Constants.SUCCESS_UPDATE_USER);
          this.loadingService.stopLoading();
        });
    } else {
      this.usersService
        .createUser({
          ...this.form.value,
          avatar: 'https://placehold.co/60x40',
        })
        .subscribe((response) => {
          this.closeModal.emit();
          this.toastr.success(Constants.SUCCESS_ADD_USER);
          this.loadingService.stopLoading();
        });
    }
  }

  public initForm(): void {
    this.form = new FormGroup({
      fname: new FormControl(
        this.selectedUser ? this.selectedUser.fname : '',
        Validators.required
      ),
      lname: new FormControl(
        this.selectedUser ? this.selectedUser.lname : '',
        Validators.required
      ),
      username: new FormControl(
        this.selectedUser ? this.selectedUser.username : '',
        Validators.required
      ),
      password: new FormControl(
        this.selectedUser ? this.selectedUser.password : '',
        Validators.required
      ),
      email: new FormControl(
        this.selectedUser
          ? this.selectedUser.email || this.selectedUser.username
          : '',
        [Validators.required, Validators.email]
      ),
    });
  }
}
