import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivitiesService } from '../services/activities.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { Observable, map } from 'rxjs';
import { ActivityFormsViewModel } from '../models/activity-forms.view-model';
import { TypeActivity, TypeActivityDisplayNames } from '../models/type-activity.enum';
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
      title: ['', [Validators.required]],
      type: [null, [Validators.required]],
      startDay: ['', [Validators.required]],
      endDay: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      theme: ['primary'],

      selectedDoctors: [undefined, [Validators.required]],
    });

    this.doctors$ = this.route.data.pipe(
      map((data) => data['doctor'])
    );
  }

  save(): void {
    const formValue = {
      ...this.form?.value,
      type: this.mapTypeToEnum(this.form?.get('type')?.value as string),
    };

    this.activitiesService.add(formValue).subscribe({
      next: (res) => this.handleSuccess(res),
      error: (err) => this.handleFail(err),
    });
  }

  handleSuccess(res: ActivityFormsViewModel) {
    this.notification.success(`A atividade ${res.type} foi cadastrada com sucesso`)

    this.router.navigate(['/activities', 'list']);
  }

  handleFail(err: any) {
    this.notification.error(err.message)
  }

  mapTypeToEnum(type: string): TypeActivity | undefined {
    const enumValues = Object.values(TypeActivity);
  
    const foundKey = enumValues.find((key) => TypeActivityDisplayNames[key] === type);
  
    return foundKey as TypeActivity | undefined;
  }
}
