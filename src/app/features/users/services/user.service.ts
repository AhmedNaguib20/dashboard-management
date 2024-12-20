import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Constants } from '../../../core/common/constants';
import { User } from '../../../core/data/models/user.model';
import UserMapper from '../../../core/data/mappers/user-mapper';
import { UsersResponse } from '../../../core/data/models/users-response.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private userMapper: UserMapper, private http: HttpClient) {}

  // Fetch all users
  getUsers(
    page: number = 1,
    itemsPerPage = Constants.ITEMS_PER_PAGE,
    searchWord: string = ''
  ): Observable<UsersResponse> {
    let query = `page=${page}&per_page=${itemsPerPage}`;
    if (searchWord) {
      query += `&search=${searchWord}`;
    }
    return this.http
      .get<UsersResponse>(`${Constants.GET_USERS_API}?${query}`)
      .pipe(
        map((response) => ({
          ...response,
          data: this.userMapper.fromList(response.data),
        }))
      );
  }

  // Create User
  createUser(values): Observable<void> {
    return this.http.post<void>(`${Constants.GET_USERS_API}/create`, {
      ...values,
    });
  }

    // Update User
    updateUser(values): Observable<void> {
      return this.http.put<void>(`${Constants.GET_USERS_API}/update`, {
        ...values,
      });
    }

  // Delete User
  deleteUser(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { id };
    return this.http.request('DELETE', `${Constants.GET_USERS_API}/delete`, {
      headers,
      body,
    });
  }
}
