import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenViewModel } from 'src/app/core/auth/models/token.view-model';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form?: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private notification: NotificationService, private router: Router) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  invalidField(name: string) {
    return (
      this.form!.get(name)!.touched && this.form!.get(name)!.invalid
    );
  }

  login() {
    if (this.form?.invalid) {
      const errors = this.form.validate();

      for (let error of errors) this.notification.warn(error);

      return;
    }
    
    this.authService.login(this.form?.value).subscribe({
      next: (res) => this.handleSuccess(res),
      error: (err) => this.handleFail(err),
    });
  }

  handleSuccess(res: TokenViewModel) {
    this.notification.success(
      'Seja bem-vindo, ' + res.user.name + '!');

    this.router.navigate(['/dashboard']);
  }

  handleFail(erro: Error) {
    this.notification.error(erro.message)
  }
}
