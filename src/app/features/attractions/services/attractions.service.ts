import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Constants } from '../../../core/common/constants';
import AttractionMapper from '../../../core/data/mappers/attraction-mapper';
import { AttractionsResponse } from '../../../core/data/models/attraction-response.model';

@Injectable({
  providedIn: 'root',
})
export class AttractionsService {
  constructor(
    private attractionMapper: AttractionMapper,
    private http: HttpClient
  ) {}

  // Fetch all Attractions
  getAttractions(
    page: number = 1,
    itemsPerPage = Constants.ITEMS_PER_PAGE,
    searchWord: string = ''
  ): Observable<AttractionsResponse> {
    let query = `page=${page}&per_page=${itemsPerPage}`;
    if (searchWord) {
      query += `&search=${searchWord}`;
    }
    return this.http
      .get<AttractionsResponse>(
        `${Constants.ATTRACTIONS_API}?${query}`
      )
      .pipe(
        map((response) => ({
          ...response,
          data: this.attractionMapper.fromList(response.data),
        }))
      );
  }

  // Create Attraction
  createAttraction(values): Observable<void> {
    return this.http.post<void>(`${Constants.CREATE_ATTRACTIONS_API}`, {
      ...values,
    });
  }

  // Update Attraction
  updateAttraction(values): Observable<void> {
    return this.http.put<void>(Constants.UPDATE_ATTRACTIONS_API, {
      ...values,
    });
  }

  // Delete Attraction
  deleteAttraction(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { id };
    return this.http.request('DELETE', `${Constants.ATTRACTIONS_API}/delete`, {
      headers,
      body,
    });
  }
}
