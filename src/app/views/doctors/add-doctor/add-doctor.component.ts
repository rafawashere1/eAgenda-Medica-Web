import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorsService } from '../services/doctors.service';
import { DoctorFormsViewModel } from '../models/doctor-forms.view-model';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      crm: ['']
    });
  }

  save(): void {
    this.doctorsService.add(this.form?.value).subscribe({
      next: (res) => this.handleSuccess(res),
      error: (err) => this.handleFail(err),
    });
  }

  handleSuccess(res: DoctorFormsViewModel) {
    this.router.navigate(['/doctors', 'list']);
  }

  handleFail(err: any) {
    console.error('Error:', err);
  }
}
