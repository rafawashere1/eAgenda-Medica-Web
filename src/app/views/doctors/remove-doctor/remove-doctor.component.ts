import { Component } from '@angular/core';
import { DoctorDetailViewModel } from '../models/doctor-detail.view-model';
import { DoctorsService } from '../services/doctors.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

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
    private router: Router,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.doctor$ = this.route.data.pipe(map(res => res['doctor']));
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
    this.notification.success(`O médico foi excluído com sucesso`)

    this.router.navigate(['/doctors', 'list']);
  }

  handleFail(err: any) {
    this.notification.error(err.message)
  }
}
