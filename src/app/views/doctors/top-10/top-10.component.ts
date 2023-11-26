import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { DoctorListViewModel } from '../models/doctor-list.view-model';

@Component({
  selector: 'app-top-10',
  templateUrl: './top-10.component.html',
  styleUrls: ['./top-10.component.scss']
})
export class Top10Component {
  displayedColumns: string[] = ['rank', 'name', 'workedHours'];
  doctors$?: Observable<DoctorListViewModel[]>;

  constructor(private route: ActivatedRoute, private notification: NotificationService) {}

  ngOnInit(): void {
    this.doctors$ = this.route.data.pipe(
      map((data) => data['doctor'])
    );
  }
}
