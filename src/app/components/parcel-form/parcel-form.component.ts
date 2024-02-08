import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'
import {  Router } from '@angular/router'
import { LocationService } from '../../services/location.service'
import { ParcelService } from '../../services/parcel.service'
import { ICountry } from '../../models/location'
import { SKUValidator } from '../../../helpers/sku-validator'

@Component({
  selector: 'app-parcel-form',
  templateUrl: './parcel-form.component.html',
  styleUrls: ['./parcel-form.component.scss']
})
export class ParcelFormComponent implements OnInit, OnDestroy {
  countries?: ICountry[]
  parcelForm = this.fb.group({
    SKU:
      ['',
        [Validators.required, Validators.minLength(5)],
        [SKUValidator.checkParcelSKU(this.parcelService)]
      ],
    description: [''],
    street: ['', Validators.required],
    town: ['', Validators.required],
    country: ['', Validators.required],
    deliveryDate: [new Date(), Validators.required]
  })
  subscriptions = new Subscription()
  isFormSubmitting = false
  today = new Date()

  constructor(
    private locationService: LocationService,
    private parcelService: ParcelService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    const countriesSubscription = this.locationService.getAllCountries().subscribe(countries => {
      this.countries = countries
    }, error => {
      console.error(error)
    })

    this.subscriptions.add(countriesSubscription)
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  onSubmit(value: any): void {
      this.isFormSubmitting = true
      const parcelData = {
        SKU: value.SKU,
        description: value.description,
        street: value.street,
        town: value.town,
        country: value.country,
        deliveryDate: value.deliveryDate
      }

      this.parcelService.createParcel(parcelData).subscribe((parcel) => {
        this.isFormSubmitting = false
        if (parcel) {
          this._snackBar.open('Parcel created!', 'Close', { panelClass: ['green-snackbar'] })
          this.router.navigate(['/parcels'])
        }
      }, (err) => {
        console.error(err)
        this.isFormSubmitting = false
        this._snackBar.open('Error creating parcel :(', 'Close', { panelClass: ['red-snackbar'] })
      })
  }
}
