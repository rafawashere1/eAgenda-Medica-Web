import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ActivityFormsViewModel } from "../models/activity-forms.view-model";
import { Observable, catchError, map, tap, throwError } from "rxjs";
import { ActivityListViewModel } from "../models/activity-list.view-model";
import { ActivityDetailViewModel } from "../models/activity-detail.view-model";

@Injectable()
export class ActivitiesService {
  private API_URL = `${environment.API_URL}/activities`;

  constructor(private http: HttpClient) {}

  add(activity: ActivityFormsViewModel): Observable<ActivityFormsViewModel> {
    return this.http.post<any>(this.API_URL, activity)
      .pipe(map((res) => res.data),
    catchError((err: HttpErrorResponse) => this.handleHttpError(err)));
  }
  
  update(id: string, activity: ActivityFormsViewModel): Observable<ActivityFormsViewModel> {
    const url = `${this.API_URL}/${id}`;
  
    return this.http.put<any>(url, activity)
      .pipe(
        map((res) => res.data),
        catchError((err: HttpErrorResponse) => this.handleHttpError(err))
      );
  }

  remove(id: string): Observable<any> {
    const url = `${this.API_URL}/${id}`;
  
    return this.http.delete<any>(url)
      .pipe(
        catchError((err: HttpErrorResponse) => this.handleHttpError(err))
      );
  }

  getById(id: string): Observable<ActivityFormsViewModel> {
    const url = `${this.API_URL}/${id}`;
  
    return this.http.get<any>(url)
      .pipe(map((res) => res.data),
        catchError((err: HttpErrorResponse) => this.handleHttpError(err))
      );
  }

  GetAll(): Observable<ActivityListViewModel[]> {
    return this.http.get<any>(this.API_URL)
    .pipe(map((res) => res.data),
    catchError((err: HttpErrorResponse) => this.handleHttpError(err)));
  }

  getFullActivityById(id: string): Observable<ActivityDetailViewModel> {
    return this.http.get<any>(`${this.API_URL}/full-visualization/${id}`)
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