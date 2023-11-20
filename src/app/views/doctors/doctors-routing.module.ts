import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDoctorsComponent } from './list-doctors/list-doctors.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListDoctorsComponent
  },
  {
    path: 'add',
    component: AddDoctorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }
