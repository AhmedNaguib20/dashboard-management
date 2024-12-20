import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Constants } from '../../../core/common/constants';
import UserMapper from '../../../core/data/mappers/user-mapper';
import { UsersResponse } from '../../../core/data/models/users-response.model';
import {
  PetsChartResponse,
  PetsResponse,
} from '../../../core/data/models/pets-chart-response.model';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  constructor(private userMapper: UserMapper, private http: HttpClient) {}

  // Fetch Chart Data
  getPetsChart(date: string): Observable<PetsChartResponse> {
    return this.http.get<PetsChartResponse>(
      `${Constants.PETS_API}/7days/${date}`
    );
  }

  // Fetch Pets
  getPets(date: string): Observable<PetsResponse[]> {
    return this.http.get<PetsResponse[]>(`${Constants.PETS_API}/${date}`);
  }
}
