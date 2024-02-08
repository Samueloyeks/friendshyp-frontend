import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParcelListComponent } from './parcel-list/parcel-list.component'
import { ParcelFormComponent } from './components/parcel-form/parcel-form.component'

const routes: Routes = [
  {path: '', component: ParcelFormComponent},
  {path: 'parcels', component: ParcelListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
