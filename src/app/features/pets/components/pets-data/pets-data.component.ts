import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PetChartComponent } from '../pet-chart/pet-chart.component';
import moment from 'moment';
import { PetsService } from '../../services/pets.service';
import {
  PetsChartResponse,
  PetsResponse,
} from '../../../../core/data/models/pets-chart-response.model';
import { LoadingService } from '../../../../shared/services/loading.service';
import { Observable } from 'rxjs';
import { SHARED_IMPORTS } from '../../../../shared/shared-standalone-imports';

@Component({
  selector: 'app-pets-data',
  standalone: true,
  imports: [PetChartComponent, SHARED_IMPORTS],
  templateUrl: './pets-data.component.html',
  styleUrl: './pets-data.component.scss',
})
export class PetsDataComponent implements OnInit {
  public date = moment().format('yyyy-MM-DD');
  public petsChartData$: Observable<PetsChartResponse>;
  public petsData: PetsResponse[];

  constructor(
    private petsService: PetsService,
    private loadingService: LoadingService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchPetsData(this.date);
    this.fetchPetsChartData(this.date);
  }

  onDateChange(date: any): void {
    this.fetchPetsData(moment(date).format('yyyy-MM-DD'));
    this.fetchPetsChartData(moment(date).format('yyyy-MM-DD'));
  }

  // private methods
  private fetchPetsData(date: string): void {
    this.loadingService.startLoading();
    this.petsService.getPets(date).subscribe((response: PetsResponse[]) => {
      this.petsData = response;
      this.loadingService.stopLoading();
    });
  }

  private fetchPetsChartData(date: string): void {
    this.petsChartData$ = this.petsService.getPetsChart(date);
  }
}
