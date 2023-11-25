import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellModule } from './shell/shell.module';
import { NotificationModule } from './notification/notification.module';
import { AuthModule } from './auth/auth.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ShellModule,
    NotificationModule,
    AuthModule
  ],
  exports: [
    ShellModule,
    AuthModule
  ]
})
export class CoreModule { }
