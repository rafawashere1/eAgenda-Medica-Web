import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsRoutingModule } from './doctors-routing.module';
import { ListDoctorsComponent } from './list-doctors/list-doctors.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DoctorsService } from './services/doctors.service';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListDoctorsComponent,
    AddDoctorComponent
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
