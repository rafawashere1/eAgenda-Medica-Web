import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { RegisterModule } from './views/register/register.module';
import { LoginModule } from './views/login/login.module';
import { AuthService } from './core/auth/services/auth.service';
import { httpTokenInterception } from './core/auth/services/http-token.interceptor';
import { AuthModule } from './core/auth/auth.module';
import { LocalStorageService } from './core/auth/services/local-storage.service';
import { SharedModule } from './shared/shared.module';

function loginSavedUserFactory(authService: AuthService) {
  return () => authService.loginSavedUser();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    RegisterModule,
    LoginModule,
    DashboardModule,
    AuthModule,
    SharedModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loginSavedUserFactory,
      deps: [AuthService],
      multi: true,
    },
    provideHttpClient(withInterceptors([httpTokenInterception])),
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
