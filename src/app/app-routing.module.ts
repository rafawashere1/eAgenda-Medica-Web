import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'doctors',
    loadChildren: () => import('./views/doctors/doctors.module').then((m) => m.DoctorsModule),
    canActivate: [authGuard]
  },
  {
    path: 'activities',
    loadChildren: () => import('./views/activities/activities.module').then((m) => m.ActivitiesModule),
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
