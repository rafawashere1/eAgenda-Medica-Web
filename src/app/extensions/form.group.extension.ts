import { FormGroup } from "@angular/forms";

declare module '@angular/forms' {
  interface FormGroup {
    validate(): string[];
  }
}

FormGroup.prototype.validate = function() {
  const errors: string[] = [];

      for (let field of Object.keys(this.controls)) {
        const control = this.get(field);

        if (!control?.errors) continue;

        control.markAsTouched();

        for (let error of Object.keys(control.errors)) {
          switch (error) {
            case 'required':
              errors.push(`Faltam campos a serem preenchidos!`);
              break;
            case 'email':
              errors.push(`Formato do email invalido!`)
              break;
            case 'password':
              errors.push(`Senha precisa ter no mínimo 6 caracteres`)
          }
        }
  }
  
  return errors;
}