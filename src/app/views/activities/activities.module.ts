import { NgModule } from '@angular/core';
import { ActivitiesRoutingModule } from './activities-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListActivitiesComponent } from './list-activities/list-activities.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DoctorsModule } from '../doctors/doctors.module';
import { ActivitiesService } from './services/activities.service';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { UpdateActivityComponent } from './update-activity/update-activity.component';


@NgModule({
  declarations: [
    ListActivitiesComponent,
    AddActivityComponent,
    UpdateActivityComponent
  ],
  imports: [
    SharedModule,
    ActivitiesRoutingModule,
    DoctorsModule,
    MatSelectModule,
    MatRadioModule,
    MatNativeDateModule,
    MatAutocompleteModule
  ],
  providers: [
    ActivitiesService
  ]
})
export class ActivitiesModule { }
