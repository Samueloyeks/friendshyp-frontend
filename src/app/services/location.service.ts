import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ICountry } from '../models/location'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {
  }

  getAllCountries(): Observable<ICountry[]> {
    return  this.http.get<ICountry[]>(`${environment.apiUrl}/country`)
  }

}
