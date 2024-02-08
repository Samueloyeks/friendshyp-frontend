import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ParcelFormComponent } from './components/parcel-form/parcel-form.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { HttpClientModule } from '@angular/common/http'
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { LocationService } from './services/location.service'
import { ParcelService } from './services/parcel.service'
import { MatNativeDateModule } from '@angular/material/core'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ParcelListComponent } from './parcel-list/parcel-list.component'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'

@NgModule({
  declarations: [
    AppComponent,
    ParcelFormComponent,
    ParcelListComponent
  ],
  imports:[
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [LocationService, MatDatepickerModule, ParcelService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
