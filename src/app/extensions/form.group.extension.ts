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
              errors.push(`O campo "${field}" é obrigatório!`);
              break;
            case 'email':
              errors.push(`O campo "${field}" deve seguir um formato válido!`)
              break;
          }
        }
  }
  
  return errors;
}