import { NgModule } from '@angular/core';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { ListDoctorsComponent } from './list-doctors/list-doctors.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DoctorsService } from './services/doctors.service';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { UpdateDoctorComponent } from './update-doctor/update-doctor.component';
import { RemoveDoctorComponent } from './remove-doctor/remove-doctor.component';
import { Top10Component } from './top-10/top-10.component';
import { TimeFormatPipe } from 'src/app/pipes/TimeFormatPipe.pipe';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    ListDoctorsComponent,
    AddDoctorComponent,
    UpdateDoctorComponent,
    RemoveDoctorComponent,
    Top10Component,
    TimeFormatPipe
  ],
  imports: [
    DoctorsRoutingModule,
    SharedModule,
    MatTableModule
  ],
  providers: [
    DoctorsService
  ]
})
export class DoctorsModule { }
