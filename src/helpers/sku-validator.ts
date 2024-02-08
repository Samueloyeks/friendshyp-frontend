import { AbstractControl, ValidationErrors } from '@angular/forms'
import { debounceTime, map, Observable } from 'rxjs'
import { IParcel } from '../app/models/parcel'
import { ParcelService } from '../app/services/parcel.service'

export class SKUValidator {
  public static checkParcelSKU(parcelService: ParcelService) {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return parcelService.getParcelBySKU(control.value)
        .pipe(
          debounceTime(200),
          map((parcel: IParcel) => {
            return parcel ? { exists: true } : null
          })
        )
    }
  }
}
