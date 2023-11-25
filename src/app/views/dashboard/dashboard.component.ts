import { Component } from '@angular/core';
import { DoctorListViewModel } from '../doctors/models/doctor-list.view-model';
import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  displayedColumns: string[] = ['rank', 'name', 'workedHours'];
  doctors$?: Observable<DoctorListViewModel[]>;

  constructor(private route: ActivatedRoute, private notification: NotificationService) {}

  ngOnInit(): void {
    this.doctors$ = this.route.data.pipe(
      map((data) => data['doctor'])
    );
  }
}
