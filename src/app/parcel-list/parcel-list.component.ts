import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator, PageEvent } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  Subject,
  Subscription,
} from 'rxjs'
import { IParcelData } from '../models/parcel'
import { ParcelService } from '../services/parcel.service'
import { LocationService } from '../services/location.service'
import { ICountry } from '../models/location'

@Component({
  selector: 'app-parcel-list',
  templateUrl: './parcel-list.component.html',
  styleUrls: ['./parcel-list.component.scss']
})
export class ParcelListComponent implements OnInit, OnDestroy {
  private searchText$ = new Subject<string>()
  displayedColumns: string[] = ['id', 'SKU', 'description', 'street', 'town', 'country', 'deliveryDate']
  dataSource!: MatTableDataSource<IParcelData>
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  countries?: ICountry[]
  pageSizeOptions = [10, 20, 50, 100]
  page = 1
  size = 10
  descriptionSearchStr?: string
  country: number | undefined
  pageEvent!: PageEvent
  subscriptions = new Subscription()
  total = 0
  isFetchingData = false
  isEmpty = false
  isError = false

  constructor(private parcelService: ParcelService, private locationService: LocationService) {
  }

  ngOnInit(): void {
    this.isFetchingData = true
    this.initDataSource()
    const countriesSubscription = this.locationService.getAllCountries().subscribe(countries => {
      this.countries = [{ id: 0, name: 'All Countries', flag: undefined }, ...countries]
      this.country = 0
    })

    const searchInputSubscription = this.searchText$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((searchStr) => {
        const text = searchStr.trim()
        this.descriptionSearchStr = (text==='') ? undefined : text
        this.fetchParcels()
      })
    ).subscribe()

    this.subscriptions.add(countriesSubscription)
    this.subscriptions.add(searchInputSubscription)
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  initDataSource() {
    const { page, size } = this
    const parcelListInitSubscription = this.parcelService.getParcels({ page, size }).subscribe((response) => {

        if (response.data.length) {
          this.dataSource = new MatTableDataSource<IParcelData>(response.data)
          this.total = response.total
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        } else {
          this.isEmpty = true
        }
        this.isFetchingData = false
      },
      () => {
        this.isError = true
        this.isFetchingData = false
      })

    this.subscriptions.add(parcelListInitSubscription)
  }

  fetchParcels() {
    this.onFetchingData()
    const { page, size, country, descriptionSearchStr } = this

    const params = {
      page, size, country, description: descriptionSearchStr
    }
    this.subscriptions.add(
      this.parcelService.getParcels(params)
        .pipe(
          map((response) => {
            if (response.data.length) {
              this.dataSource = new MatTableDataSource<IParcelData>(response.data)
              this.total = response.total
            } else {
              this.isEmpty = true
            }
            this.isFetchingData = false
          }),
          catchError(() => [
            this.isError = true
          ])
        ).subscribe()
    )
  }

  search(searchStr: string) {
    this.searchText$.next(searchStr)
  }

  setCountryFilter() {
    if (!this.country) {
      this.country = undefined
    }
    this.fetchParcels()
  }

  onPaginateChange(event: PageEvent) {
    this.page = event.pageIndex + 1
    this.size = event.pageSize

    this.fetchParcels()
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value
  }

  private onFetchingData() {
    this.isEmpty = false
    this.isError = false
    this.isFetchingData = true
  }
}
