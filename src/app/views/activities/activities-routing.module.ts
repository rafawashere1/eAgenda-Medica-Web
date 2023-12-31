import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { ListActivitiesComponent } from './list-activities/list-activities.component';
import { ActivitiesService } from './services/activities.service';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { doctorListResolver } from '../doctors/services/list-doctors.resolver';
import { UpdateActivityComponent } from './update-activity/update-activity.component';
import { RemoveActivityComponent } from './remove-activity/remove-activity.component';

const activityFormsResolver = (route: ActivatedRouteSnapshot) => {
  return inject(ActivitiesService).getById(route.paramMap.get('id')!)
}

const activityDetailResolver = (route: ActivatedRouteSnapshot) => {
  return inject(ActivitiesService).getFullActivityById(
    route.paramMap.get('id')!
  );
};

const activityListResolver = () => {
  return inject(ActivitiesService).GetAll();
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListActivitiesComponent,
    resolve: { activity: activityListResolver }
  },
  {
    path: 'add',
    component: AddActivityComponent,
    resolve: { doctor: doctorListResolver }
  },
  {
    path: 'update/:id',
    component: UpdateActivityComponent,
    resolve: {
      activity: activityFormsResolver,
      doctor: doctorListResolver}
  },
  {
    path: 'remove/:id',
    component: RemoveActivityComponent,
    resolve: { activity: activityDetailResolver}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
