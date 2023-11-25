import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenViewModel } from 'src/app/core/auth/models/token.view-model';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form?: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private notification: NotificationService, private router: Router) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      login: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  invalidField(name: string) {
    return (
      this.form!.get(name)!.touched && this.form!.get(name)!.invalid
    );
  }

  register() {
    if (this.form?.invalid) {
      const errors = this.form.validate();

      for (let error of errors) this.notification.warn(error);

      return;
    }
    console.log(this.form?.value)
    this.authService.register(this.form?.value).subscribe({
      next: (res) => this.handleSuccess(res),
      error: (err) => this.handleFail(err),
    });
  }

  handleSuccess(res: TokenViewModel) {
    console.log('Registration successful. User:', res.user);
  
    this.notification.success('Seja bem-vindo, ' + res.user.name + '!');
    
    console.log('Navigating to dashboard...');
    this.router.navigate(['/dashboard']);
  }

  handleFail(erro: Error) {
    this.notification.error(erro.message)
  }
}
