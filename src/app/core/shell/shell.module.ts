import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShellRoutingModule } from './shell-routing.module';



@NgModule({
  declarations: [
    ShellComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShellRoutingModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  exports: [
    ShellComponent
  ]
})
export class ShellModule { }
