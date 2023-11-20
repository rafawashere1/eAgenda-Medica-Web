import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorFormsViewModel } from '../models/doctor-forms.view-model';
import { DoctorsService } from '../services/doctors.service';

@Component({
  selector: 'app-update-doctor',
  templateUrl: './update-doctor.component.html',
  styleUrls: ['./update-doctor.component.scss']
})
export class UpdateDoctorComponent implements OnInit {
  form?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private doctorsService: DoctorsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [''],
      crm: ['']
    });

    const doctor = this.route.snapshot.data['doctor'];
    this.form.patchValue(doctor);
  }

  save(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.doctorsService.update(id, this.form?.value).subscribe({
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
