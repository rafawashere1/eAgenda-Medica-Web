import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsRoutingModule } from './doctors-routing.module';
import { ListDoctorsComponent } from './list-doctors/list-doctors.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DoctorsService } from './services/doctors.service';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateDoctorComponent } from './update-doctor/update-doctor.component';
import { RemoveDoctorComponent } from './remove-doctor/remove-doctor.component';


@NgModule({
  declarations: [
    ListDoctorsComponent,
    AddDoctorComponent,
    UpdateDoctorComponent,
    RemoveDoctorComponent
  ],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    DoctorsService
  ]
})
export class DoctorsModule { }
