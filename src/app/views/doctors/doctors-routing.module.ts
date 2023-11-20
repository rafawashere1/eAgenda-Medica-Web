import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { ListDoctorsComponent } from './list-doctors/list-doctors.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { UpdateDoctorComponent } from './update-doctor/update-doctor.component';
import { DoctorsService } from './services/doctors.service';

const doctorFormsResolver = (route: ActivatedRouteSnapshot) => {
  return inject(DoctorsService).getById(route.paramMap.get('id')!)
}

const doctorListResolver = () => {
  return inject(DoctorsService).GetAll();
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
    resolve: { doctor: doctorFormsResolver}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }