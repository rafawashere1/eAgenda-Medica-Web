import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { DoctorListViewModel } from '../../doctors/models/doctor-list.view-model';
import { ActivityFormsViewModel } from '../models/activity-forms.view-model';
import { TypeActivityDisplayNames } from '../models/type-activity.enum';
import { ActivitiesService } from '../services/activities.service';

@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.scss']
})
export class UpdateActivityComponent {
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

      selectedDoctors: [undefined, [Validators.required]],
    });

    const activity = this.route.snapshot.data['activity'];
    this.form.patchValue(activity);

    this.doctors$ = this.route.data.pipe(
      map((data) => data['doctor'])
    );
  }

  save(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.activitiesService.update(id, this.form?.value).subscribe({
      next: (res) => this.handleSuccess(res),
      error: (err) => this.handleFail(err),
    });
  }

  handleSuccess(res: ActivityFormsViewModel) {
    this.notification.success(`A atividade ${res.type} foi editada com sucesso`)

    this.router.navigate(['/activities', 'list']);
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
