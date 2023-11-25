import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DoctorsService } from '../doctors/services/doctors.service';
import { authGuard } from 'src/app/core/auth/guards/auth.guard';

const doctorListResolver = () => {
  return inject(DoctorsService).getDoctorsSortedByWorkedHours();
};

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: { doctor: doctorListResolver },
    canActivate: [authGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
