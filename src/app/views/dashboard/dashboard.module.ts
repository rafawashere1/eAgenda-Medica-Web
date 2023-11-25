import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DoctorsService } from '../doctors/services/doctors.service';
import { TimeFormatPipe } from 'src/app/pipes/TimeFormatPipe.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    TimeFormatPipe
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatTableModule
  ],
  providers: [
    DoctorsService
  ]
})
export class DashboardModule { }
