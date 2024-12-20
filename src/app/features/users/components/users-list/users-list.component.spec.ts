import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { UsersListComponent } from './users-list.component';
import { UsersService } from '../../services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';
import { LoadingService } from '../../../../shared/services/loading.service';
import { User } from '../../../../core/data/models/user.model';
import { UsersResponse } from '../../../../core/data/models/users-response.model';
import { By } from '@angular/platform-browser';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let usersService: jasmine.SpyObj<UsersService>;
  let loadingService: jasmine.SpyObj<LoadingService>;

  beforeEach(async () => {
    const mockUsersService = jasmine.createSpyObj('UsersService', [
      'getUsers',
      'deleteUser',
    ]);
    const mockLoadingService = jasmine.createSpyObj('LoadingService', [
      'startLoading',
      'stopLoading',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatPaginatorModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        UsersListComponent, // Standalone component
      ],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        { provide: LoadingService, useValue: mockLoadingService },
      ],
    }).compileComponents();

    usersService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    loadingService = TestBed.inject(
      LoadingService
    ) as jasmine.SpyObj<LoadingService>;

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data on init', () => {
    const mockResponse: UsersResponse = {
      data: [
        {
          id: 1,
          fname: 'John',
          lname: 'Doe',
          username: 'johndoe',
          password: '',
          email: 'john.doe@example.com',
          avatar: '',
          toJson: () => JSON.stringify({}),
        },
      ],
      total: 1,
      per_page: 10,
      page: 1,
      total_pages: 1,
    };
    usersService.getUsers.and.returnValue(of(mockResponse));

    component.ngOnInit();
    expect(usersService.getUsers).toHaveBeenCalledWith(1, 10, '');
    expect(component.dataSource.data).toEqual(mockResponse.data);
    expect(component.length).toBe(mockResponse.total);
  });

  it('should handle pagination', () => {
    const mockResponse: UsersResponse = {
      data: [
        {
          id: 3,
          fname: 'Sam',
          lname: 'Smith',
          username: 'samsmith',
          password: '',
          email: 'sam.smith@example.com',
          avatar: '',
          toJson: () => JSON.stringify({}),
        },
      ],
      total: 1,
      per_page: 10,
      page: 2,
      total_pages: 2,
    };
    usersService.getUsers.and.returnValue(of(mockResponse));

    const pageEvent: PageEvent = {
      pageIndex: 1,
      pageSize: 10,
      length: 20,
    };

    component.onPageChange(pageEvent);
    expect(usersService.getUsers).toHaveBeenCalledWith(2, 10, '');
    expect(component.currentPage).toBe(2);
    expect(component.pageSize).toBe(10);
    expect(component.dataSource.data).toEqual(mockResponse.data);
  });

  it('should open create user modal', () => {
    component.onCreateUser();
    expect(component.showCreateModal).toBeTrue();
    expect(component.selectedUser).toBeNull();
  });

  it('should open edit user modal', () => {
    const user: User = {
      id: 1,
      fname: 'John',
      lname: 'Doe',
      username: 'johndoe',
      password: '',
      email: 'john.doe@example.com',
      avatar: '',
      toJson: () => JSON.stringify({}),
    };
    component.onEditUser(user);
    expect(component.showCreateModal).toBeTrue();
    expect(component.selectedUser).toEqual(user);
  });

  it('should delete a user', () => {
    const user: User = {
      id: 1,
      fname: 'John',
      lname: 'Doe',
      username: 'johndoe',
      password: '',
      email: 'john.doe@example.com',
      avatar: '',
      toJson: () => JSON.stringify({}),
    };
    usersService.deleteUser.and.returnValue(of(null));

    component.onDeleteUser(user);
    expect(loadingService.startLoading).toHaveBeenCalled();
    expect(usersService.deleteUser).toHaveBeenCalledWith(user.id);
  });
});
