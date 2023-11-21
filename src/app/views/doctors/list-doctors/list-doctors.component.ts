import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map} from 'rxjs';
import { DoctorListViewModel } from '../models/doctor-list.view-model';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

@Component({
  selector: 'app-list-doctors',
  templateUrl: './list-doctors.component.html',
  styleUrls: ['./list-doctors.component.scss']
})
export class ListDoctorsComponent implements OnInit {
  doctors$?: Observable<DoctorListViewModel[]>;

  constructor(private route: ActivatedRoute, private notification: NotificationService) {}

  ngOnInit(): void {
    this.doctors$ = this.route.data.pipe(
      map((data) => data['doctor'])
    );

    this.notification.success('Médicos obtidos com sucesso!')
  }
}
