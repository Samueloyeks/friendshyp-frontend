import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { IParcel, IParcelParams, IParcelData } from '../models/parcel'

@Injectable({
  providedIn: 'root'
})
export class ParcelService {
  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json')

  constructor(private http: HttpClient) {

  }

  getParcelBySKU(SKU: string): Observable<IParcel> {
    return this.http.get<IParcel>(`${environment.apiUrl}/parcel/find-by-sku?SKU=${SKU}`)
  }

  createParcel(parcelData: IParcel): Observable<IParcel & { id: string }> {
    return this.http.post<IParcel & { id: string }>(`${environment.apiUrl}/parcel`, parcelData, { headers: this.headers })
  }

  getParcels({
               page = 1,
               size = 10,
               country = undefined,
               description = undefined
             }: IParcelParams): Observable<{ data: IParcelData[], total: number }> {
    let params = new HttpParams().set('page', page).set('size', size)

    if (country) {
      params = params.append('country', country)
    }
    if (description) {
      params = params.append('description', description)
    }

    return this.http.get<{ data: IParcelData[], total: number }>(`${environment.apiUrl}/parcel`, {
      headers: this.headers,
      params
    })
  }
}
