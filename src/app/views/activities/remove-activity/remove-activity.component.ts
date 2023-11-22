import { Component } from '@angular/core';
import { ActivityDetailViewModel } from '../models/activity-detail.view-model';
import { Observable, map, switchMap } from 'rxjs';
import { ActivitiesService } from '../services/activities.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

@Component({
  selector: 'app-remove-activity',
  templateUrl: './remove-activity.component.html',
  styleUrls: ['./remove-activity.component.scss']
})
export class RemoveActivityComponent {
  activity$?: Observable<ActivityDetailViewModel>;

  constructor(
    private activitiesService: ActivitiesService,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.activity$ = this.route.data.pipe(map((res) => res['activity']));
  }

  confirm(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')!),
        switchMap((id) => this.activitiesService.remove(id))
      )
      .subscribe({
        next: () => this.handleSuccess(),
        error: (err) => this.handleFail(err),
      });
  }

  handleSuccess() {
    this.notification.success(`A atividade foi excluída com sucesso`)

    this.router.navigate(['/activities', 'list']);
  }

  handleFail(err: any) {
    this.notification.error(err.message)
  }
}
