import { Injectable } from '@angular/core';
import { MapperInterface } from '../../interfaces/mapper.interface';
import { Attraction } from '../models/attraction.model';

@Injectable({
  providedIn: 'root',
})
export default class AttractionMapper implements MapperInterface<Attraction> {
  fromJson(json: any): Attraction {
    return new Attraction(
      json['id'],
      json['name'],
      json['latitude'],
      json['longitude'],
      json['detail'],
      json['coverimage']
    );
  }

  fromList(json: any): Attraction[] {
    const list: Attraction[] = [];
    if (json) {
      json.forEach((element: any) => {
        list.push(this.fromJson(element));
      });
    }
    return list;
  }
}
