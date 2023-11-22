import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { DoctorListViewModel } from '../../doctors/models/doctor-list.view-model';
import { ActivityFormsViewModel } from '../models/activity-forms.view-model';
import { TypeActivity, TypeActivityDisplayNames } from '../models/type-activity.enum';
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
      title: ['', [Validators.required]],
      type: [0, [Validators.required]],
      startDay: ['', [Validators.required]],
      endDay: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      theme: ['primary'],

      selectedDoctors: [undefined, [Validators.required]],
    });

    const activity = this.route.snapshot.data['activity'];
    this.form.patchValue(activity);

    this.doctors$ = this.route.data.pipe(
      map((data) => data['doctor'])
    );
  }
  
  save(): void {
    console.log('Form Values:', this.form?.value);
  
    const formValue = {
      ...this.form?.value,
      type: this.mapTypeToEnum(this.form?.get('type')?.value as string),
    };
  
    console.log(formValue)
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')!),
        switchMap((id) => this.activitiesService.update(id, formValue))
      )
      .subscribe({
        next: (res) => this.handleSuccess(res),
        error: (err) => this.handleFail(err),
      });
  }

  handleSuccess(res: ActivityFormsViewModel) {
    this.notification.success(`A atividade ${res.title} foi editada com sucesso`)

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
