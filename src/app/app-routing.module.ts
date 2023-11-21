import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'doctors',
    loadChildren: () => import('./views/doctors/doctors.module').then((m) => m.DoctorsModule)
  },
  {
    path: 'activities',
    loadChildren: () => import('./views/activities/activities.module').then((m) => m.ActivitiesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
