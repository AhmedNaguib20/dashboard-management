import {
  Component,
  inject,
  model,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsersService } from '../../services/user.service';
import { User } from '../../../../core/data/models/user.model';
import { UsersResponse } from '../../../../core/data/models/users-response.model';
import { Constants } from '../../../../core/common/constants';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../../../shared/services/loading.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TableColumns } from './table-columns';

@Component({
  selector: 'app-users-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    CardComponent,
    AddEditUserComponent,
    CommonModule,
    NzTableModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  standalone: true,
})
export class UsersListComponent implements OnInit {
  public columns = TableColumns;
  public dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  public length: number = 12;
  public pageSize: number = Constants.ITEMS_PER_PAGE;
  public currentPage: number = 1;
  public searchWord: Subject<string> = new Subject<string>();
  public showCreateModal: boolean = false;
  public selectedUser: User;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userService: UsersService,
    private toastr: ToastrService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.fetchUserData(this.currentPage, this.pageSize, '');
    this.searchWord
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((searchWord) => {
        this.fetchUserData(1, Constants.ITEMS_PER_PAGE, searchWord);
      });
  }

  onSearch($event) {
    this.searchWord.next($event.target.value);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    this.fetchUserData(this.currentPage, this.pageSize, '');
  }

  onCreateUser(): void {
    this.selectedUser = null;
    this.showCreateModal = true;
  }

  onEditUser(user: User): void {
    this.selectedUser = user;
    this.showCreateModal = true;
  }

  closeModal(): void {
    this.showCreateModal = false;
    this.fetchUserData(this.currentPage, this.pageSize, '');
  }

  onDeleteUser(user: User): void {
    this.loadingService.startLoading();

    this.userService.deleteUser(user.id).subscribe(() => {
      this.toastr.success(Constants.SUCCESS_DELETE_USER);
      this.fetchUserData(this.currentPage, this.pageSize, '');
      this.loadingService.stopLoading();
    });
  }

  // private methods
  private fetchUserData(
    page: number,
    itemsPerPage: number,
    searchWord: string | null
  ) {
    this.loadingService.startLoading();
    this.userService.getUsers(page, itemsPerPage, searchWord).subscribe({
      next: (response: UsersResponse) => {
        this.dataSource.data = response.data;
        this.length = response.total;
        this.pageSize = response.per_page;
        this.currentPage = response.page;
        this.loadingService.stopLoading();
      },
    });
  }
}
