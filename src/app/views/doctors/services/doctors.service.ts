import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DoctorFormsViewModel } from '../models/doctor-forms.view-model';
import { DoctorListViewModel } from '../models/doctor-list.view-model';
import { DoctorDetailViewModel } from '../models/doctor-detail.view-model';

@Injectable()
export class DoctorsService {
  private API_URL = `${environment.API_URL}/doctors`;

  constructor(private http: HttpClient) {}

  add(doctor: DoctorFormsViewModel): Observable<DoctorFormsViewModel> {
    return this.http.post<any>(this.API_URL, doctor)
      .pipe(map((res) => res.data),
    catchError((err: HttpErrorResponse) => this.handleHttpError(err)));
  }

  update(id: string, doctor: DoctorFormsViewModel): Observable<DoctorFormsViewModel> {
    const url = `${this.API_URL}/${id}`;

    return this.http.put<any>(url, doctor)
    .pipe(map((res) => res.data),
    catchError((err: HttpErrorResponse) => this.handleHttpError(err)));
  }

  remove(id: string): Observable<any> {
    const url = `${this.API_URL}/${id}`;

    return this.http.delete<any>(url);
  }

  getById(id: string): Observable<DoctorFormsViewModel> {
    const url = `${this.API_URL}/${id}`;
  
    return this.http.get<any>(url)
      .pipe(map((res) => res.data),
        catchError((err: HttpErrorResponse) => this.handleHttpError(err))
      );
  }

  GetAll(): Observable<DoctorListViewModel[]> {
    return this.http.get<any>(this.API_URL)
    .pipe(map((res) => res.data),
    catchError((err: HttpErrorResponse) => this.handleHttpError(err)));
  }

  getFullDoctorById(id: string): Observable<DoctorDetailViewModel> {
    return this.http.get<any>(`${this.API_URL}/full-visualization/${id}`)
      .pipe(map((res) => res.data),
      catchError((err: HttpErrorResponse) => this.handleHttpError(err)));
  }

  getDoctorsSortedByWorkedHours(): Observable<DoctorListViewModel[]> {
    return this.http.get<any>(`${this.API_URL}/top-10-workers`)
    .pipe(map((res) => res.data),
    catchError((err: HttpErrorResponse) => this.handleHttpError(err)));
  }

  private handleHttpError(error: HttpErrorResponse) {
    let errorMessage  = '';

    if (error.status == 0)
      errorMessage  = 'Ocorreu um erro ao processar a requisição.';
    if (error.status == 401)
      errorMessage  = 'O usuário não está autorizado. Efetue login e tente novamente.';
    else
      errorMessage  = error.error?.errors[0];

    return throwError(() => new Error(errorMessage))
  }
}