import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListActivitiesComponent } from './list-activities/list-activities.component';
import { ActivitiesService } from './services/activities.service';

// const activityFormsResolver = (route: ActivatedRouteSnapshot) => {
//   return inject(ActivitiesService).getById(route.paramMap.get('id')!)
// }

// const activityDetailResolver = (route: ActivatedRouteSnapshot) => {
//   return inject(ActivitiesService).getFullDoctorById(
//     route.paramMap.get('id')!
//   );
// };

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
  // {
  //   path: 'add',
  //   component: AddDoctorComponent,
  // },
  // {
  //   path: 'update/:id',
  //   component: UpdateDoctorComponent,
  //   resolve: { doctor: doctorFormsResolver}
  // },
  // {
  //   path: 'remove/:id',
  //   component: RemoveDoctorComponent,
  //   resolve: { doctor: doctorDetailResolver}
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
