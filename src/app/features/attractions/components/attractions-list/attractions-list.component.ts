import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Constants } from '../../../../core/common/constants';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AddEditAttractionComponent } from '../add-edit-attraction/add-edit-attraction.component';
import { AttractionsService } from '../../services/attractions.service';
import { AttractionsResponse } from '../../../../core/data/models/attraction-response.model';
import { Attraction } from '../../../../core/data/models/attraction.model';
import { LoadingService } from '../../../../shared/services/loading.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TableColumns } from './table-columns';

@Component({
  selector: 'app-attractions-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    CardComponent,
    AddEditAttractionComponent,
    CommonModule,
    NzTableModule,
  ],
  templateUrl: './attractions-list.component.html',
  styleUrl: './attractions-list.component.scss',
  standalone: true,
})
export class attractionsListComponent implements OnInit {
  public columns = TableColumns;
  public dataSource: MatTableDataSource<Attraction> =
    new MatTableDataSource<Attraction>();
  public length: number = 12;
  public pageSize: number = Constants.ITEMS_PER_PAGE;
  public currentPage: number = 1;
  public searchWord: Subject<string> = new Subject<string>();
  public showCreateModal: boolean = false;
  public selectedAttraction: Attraction;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private attractionsService: AttractionsService,
    private toastr: ToastrService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.fetchAttractionData(this.currentPage, this.pageSize);
    this.searchWord
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((searchWord) => {
        this.fetchAttractionData(1, Constants.ITEMS_PER_PAGE, searchWord);
      });
  }

  onSearch($event) {
    this.searchWord.next($event.target.value);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    this.fetchAttractionData(this.currentPage, this.pageSize);
  }

  onCreateAttraction(): void {
    this.selectedAttraction = null;
    this.showCreateModal = true;
  }

  onEditAttraction(attraction: Attraction): void {
    this.selectedAttraction = attraction;
    this.showCreateModal = true;
  }

  closeModal(): void {
    this.showCreateModal = false;
    this.fetchAttractionData(this.currentPage, this.pageSize);
  }

  onDeleteAttraction(attraction: Attraction): void {
    this.loadingService.startLoading();
    this.attractionsService.deleteAttraction(attraction.id).subscribe(() => {
      this.toastr.success(Constants.SUCCESS_DELETE_ATTRACTION);
      this.fetchAttractionData(this.currentPage, this.pageSize);
      this.loadingService.stopLoading();
    });
  }

  // private methods
  private fetchAttractionData(
    page: number,
    itemsPerPage: number,
    searchWord: string = ''
  ) {
    this.loadingService.startLoading();
    this.attractionsService
      .getAttractions(page, itemsPerPage, searchWord)
      .subscribe({
        next: (response: AttractionsResponse) => {
          this.dataSource.data = response.data;
          this.length = response.total;
          this.pageSize = response.per_page;
          this.currentPage = response.page;
          this.loadingService.stopLoading();
        },
      });
  }
}
