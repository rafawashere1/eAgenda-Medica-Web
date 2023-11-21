import { NgModule } from '@angular/core';
import { ActivitiesRoutingModule } from './activities-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListActivitiesComponent } from './list-activities/list-activities.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { DoctorsModule } from '../doctors/doctors.module';
import { ActivitiesService } from './services/activities.service';


@NgModule({
  declarations: [
    ListActivitiesComponent
  ],
  imports: [
    SharedModule,
    ActivitiesRoutingModule,
    DoctorsModule,
    MatSelectModule,
    MatRadioModule
  ],
  providers: [
    ActivitiesService
  ]
})
export class ActivitiesModule { }
