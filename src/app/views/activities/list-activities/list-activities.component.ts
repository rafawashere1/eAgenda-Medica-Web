import { Component, OnInit } from '@angular/core';
import { ActivityListViewModel } from '../models/activity-list.view-model';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

@Component({
  selector: 'app-list-activities',
  templateUrl: './list-activities.component.html',
  styleUrls: ['./list-activities.component.scss']
})
export class ListActivitiesComponent implements OnInit {
  activities$?: Observable<ActivityListViewModel[]>;

  constructor(private route: ActivatedRoute, private notification: NotificationService) {}

  ngOnInit(): void {
    this.activities$ = this.route.data.pipe(map((data) => data['activity']));

    this.notification.success('Atividades obtidas com sucesso!')
  }
}
