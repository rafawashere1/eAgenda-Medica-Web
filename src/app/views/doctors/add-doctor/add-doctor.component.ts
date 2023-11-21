import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorsService } from '../services/doctors.service';
import { DoctorFormsViewModel } from '../models/doctor-forms.view-model';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent implements OnInit {
  form?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private doctorsService: DoctorsService,
    private router: Router,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      crm: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  save(): void {
    this.doctorsService.add(this.form?.value).subscribe({
      next: (res) => this.handleSuccess(res),
      error: (err) => this.handleFail(err),
    });
  }

  handleSuccess(res: DoctorFormsViewModel) {
    this.notification.success(`O médico ${res.name} foi cadastrado com sucesso`)

    this.router.navigate(['/doctors', 'list']);
  }

  handleFail(err: any) {
    this.notification.error(err.message)
  }
}
