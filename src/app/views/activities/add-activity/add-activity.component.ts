import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivitiesService } from '../services/activities.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { Observable, map } from 'rxjs';
import { ActivityFormsViewModel } from '../models/activity-forms.view-model';
import { TypeActivityDisplayNames } from '../models/type-activity.enum';
import { DoctorListViewModel } from '../../doctors/models/doctor-list.view-model';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss']
})
export class AddActivityComponent {
  form?: FormGroup;
  doctors$?: Observable<DoctorListViewModel[]>;
  typeActivityOptions = Object.values(TypeActivityDisplayNames);

  constructor(
    private fb: FormBuilder,
    private activitiesService: ActivitiesService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      typeActivity: [null, [Validators.required]],
      startTime: ['', [Validators.required, this.timeFormatValidator()]],
      endTime: ['', [Validators.required, this.timeFormatValidator()]],
      tema: ['primary'],

      doctorId: [undefined, [Validators.required]],
    });

    this.doctors$ = this.route.data.pipe(
      map((data) => data['doctor'])
    );
  }

  save(): void {
    this.activitiesService.add(this.form?.value).subscribe({
      next: (res) => this.handleSuccess(res),
      error: (err) => this.handleFail(err),
    });
  }

  handleSuccess(res: ActivityFormsViewModel) {
    this.notification.success(`A atividade ${res.type} foi cadastrada com sucesso`)

    this.router.navigate(['/doctors', 'list']);
  }

  handleFail(err: any) {
    this.notification.error(err.message)
  }

  private timeFormatValidator() {
    return (control: any) => {
      const validPattern = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;

      if (!validPattern.test(control.value)) {
        return { invalidTimeFormat: true };
      }

      return null;
    };
  }
}
