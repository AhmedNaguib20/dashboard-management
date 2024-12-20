import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AddEditUserComponent } from './add-edit-user.component';
import { UsersService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

describe('AddEditUserComponent', () => {
  let component: AddEditUserComponent;
  let fixture: ComponentFixture<AddEditUserComponent>;
  let usersServiceMock: any;

  beforeEach(async () => {
    usersServiceMock = jasmine.createSpyObj('UsersService', [
      'createUser',
      'updateUser',
    ]);
    usersServiceMock.createUser.and.returnValue(of({}));
    usersServiceMock.updateUser.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AddEditUserComponent],
      providers: [
        { provide: UsersService, useValue: usersServiceMock },
        { provide: ToastrService, useValue: { success: jasmine.createSpy() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger ngOnInit and form initialization
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

});
