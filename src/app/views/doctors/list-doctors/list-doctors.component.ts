import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { DoctorListViewModel } from '../models/doctor-list.view-model';

@Component({
  selector: 'app-list-doctors',
  templateUrl: './list-doctors.component.html',
  styleUrls: ['./list-doctors.component.scss']
})
export class ListDoctorsComponent implements OnInit {
  doctors$?: Observable<DoctorListViewModel[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.doctors$ = this.route.data.pipe(
      map((dados) => dados['doctors'])
    );
  }
}
