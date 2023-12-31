import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { ListDoctorsComponent } from './list-doctors/list-doctors.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { UpdateDoctorComponent } from './update-doctor/update-doctor.component';
import { DoctorsService } from './services/doctors.service';
import { RemoveDoctorComponent } from './remove-doctor/remove-doctor.component';
import { doctorListResolver } from './services/list-doctors.resolver';
import { Top10Component } from './top-10/top-10.component';

const doctorFormsResolver = (route: ActivatedRouteSnapshot) => {
  return inject(DoctorsService).getById(route.paramMap.get('id')!)
}

const doctorDetailResolver = (route: ActivatedRouteSnapshot) => {
  return inject(DoctorsService).getFullDoctorById(
    route.paramMap.get('id')!
  );
};

const doctorTop10Resolver = () => {
  return inject(DoctorsService).getDoctorsSortedByWorkedHours();
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListDoctorsComponent,
    resolve: { doctor: doctorListResolver }
  },
  {
    path: 'add',
    component: AddDoctorComponent,
  },
  {
    path: 'update/:id',
    component: UpdateDoctorComponent,
    resolve: { doctor: doctorFormsResolver }
  },
  {
    path: 'remove/:id',
    component: RemoveDoctorComponent,
    resolve: { doctor: doctorDetailResolver }
  },
  {
    path: 'top-10',
    component: Top10Component,
    resolve: { doctor: doctorTop10Resolver }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }
