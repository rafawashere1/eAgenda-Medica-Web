import { Component } from '@angular/core';
import { DoctorDetailViewModel } from '../models/doctor-detail.view-model';
import { DoctorsService } from '../services/doctors.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-remove-doctor',
  templateUrl: './remove-doctor.component.html',
  styleUrls: ['./remove-doctor.component.scss']
})
export class RemoveDoctorComponent {
  doctor$?: Observable<DoctorDetailViewModel>;

  constructor(
    private doctorsService: DoctorsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.doctor$ = this.route.data.pipe(map((res) => res['doctor']));
  }

  confirm(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')!),
        switchMap((id) => this.doctorsService.remove(id))
      )
      .subscribe({
        next: () => this.handleSuccess(),
        error: (err) => this.handleFail(err),
      });
  }

  handleSuccess() {
    this.router.navigate(['/doctors', 'list']);
  }

  handleFail(err: any) {
    console.error('Error:', err);
  }
}
