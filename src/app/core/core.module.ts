import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellModule } from './shell/shell.module';
import { NotificationModule } from './notification/notification.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ShellModule,
    NotificationModule
  ],
  exports: [
    ShellModule
  ]
})
export class CoreModule { }
