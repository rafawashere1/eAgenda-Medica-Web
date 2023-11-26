import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './core/auth/services/auth.service';
import { LocalStorageService } from './core/auth/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public authenticatedUser$ = this.authService.getAuthenticatedUser();;

  constructor(
    title: Title,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {
    title.setTitle("Início - e-Agenda Médica");
  }

  ngOnInit() { this.loginAuthenticatedUser(); }

  private loginAuthenticatedUser() {
    const authenticatedUser = this.localStorageService.getSavedLocalData();

    if (authenticatedUser)
      this.authService.notifyLogin(authenticatedUser.user);
  }
}
