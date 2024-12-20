import { Injectable } from '@angular/core';
import { MapperInterface } from '../../interfaces/mapper.interface';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export default class UserMapper implements MapperInterface<User> {
  fromJson(json: any): User {
    return new User(
      json['id'],
      json['fname'],
      json['lname'],
      json['password'],
      json['username'],
      json['email'],
      json['avatar']
    );
  }

  fromList(json: any): User[] {
    const list: User[] = [];
    if (json) {
      json.forEach((element: any) => {
        list.push(this.fromJson(element));
      });
    }
    return list;
  }
}
