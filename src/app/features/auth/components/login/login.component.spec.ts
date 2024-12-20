import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginService } from '../../services/login.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadingService } from '../../../../shared/services/loading.service';
import { User } from '../../../../core/data/models/user.model';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: jasmine.SpyObj<LoginService>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let loadingService: jasmine.SpyObj<LoadingService>;
  let router: Router;

  beforeEach(async () => {
    const mockLoginService = jasmine.createSpyObj('LoginService', ['login']);
    const mockToastrService = jasmine.createSpyObj('ToastrService', [
      'success',
    ]);
    const mockLoadingService = jasmine.createSpyObj('LoadingService', [
      'startLoading',
      'stopLoading',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        ToastrModule.forRoot(),
        HttpClientTestingModule, // Added to mock HTTPClient
        LoginComponent, // Standalone Component
      ],
      providers: [
        { provide: LoginService, useValue: mockLoginService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: LoadingService, useValue: mockLoadingService },
      ],
    }).compileComponents();

    loginService = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    toastrService = TestBed.inject(
      ToastrService
    ) as jasmine.SpyObj<ToastrService>;
    loadingService = TestBed.inject(
      LoadingService
    ) as jasmine.SpyObj<LoadingService>;
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    component.ngOnInit();
    expect(component.form.value).toEqual({
      username: '',
      password: '',
    });
  });

  it('should show an error if the form is invalid on submit', () => {
    // Trigger component initialization
    fixture.detectChanges();

    // Set invalid form values
    component.form.setValue({ username: '', password: '' });

    // Call the submit method
    component.onSubmit();

    // Check if the form is invalid
    expect(component.form.valid).toBeFalse();

    // Ensure no API calls are made
    expect(loginService.login).not.toHaveBeenCalled();
    expect(loadingService.startLoading).not.toHaveBeenCalled();
    expect(toastrService.success).not.toHaveBeenCalled();
  });

  it('should call login service and navigate to home on valid form submission', () => {
    const mockResponse: User = {
      id: 1,
      fname: 'John',
      lname: 'Doe',
      username: 'johndoe',
      password: 'password123',
      email: 'john.doe@example.com',
      avatar: 'https://placehold.co/60x40',
      toJson: () => JSON.stringify({}), // Provide a mock implementation if needed
    };

    // Mock the login service response
    loginService.login.and.returnValue(of(mockResponse));
    spyOn(router, 'navigate');

    // Trigger ngOnInit to initialize the form
    fixture.detectChanges();

    // Set form values
    component.form.setValue({ username: 'johndoe', password: 'password123' });

    // Call the submit method
    component.onSubmit();

    // Assertions
    expect(loadingService.startLoading).toHaveBeenCalled();
    expect(loginService.login).toHaveBeenCalledWith({
      username: 'johndoe',
      password: 'password123',
    });
    expect(toastrService.success).toHaveBeenCalledWith('Welcome John Doe');
    expect(router.navigate).toHaveBeenCalledWith(['/home/users']);
    expect(loadingService.stopLoading).toHaveBeenCalled();
  });

  it('should not call login service if the form is invalid', () => {
    // Trigger ngOnInit to initialize the form
    fixture.detectChanges();

    // Ensure the form is invalid (setValue for missing or invalid values)
    component.form.setValue({ username: '', password: '' });

    // Call the submit method
    component.onSubmit();

    // Assertions
    expect(loadingService.startLoading).not.toHaveBeenCalled();
    expect(loginService.login).not.toHaveBeenCalled();
    expect(toastrService.success).not.toHaveBeenCalled();
  });
});
