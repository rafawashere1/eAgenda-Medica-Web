import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { UserTokenViewModel } from "../models/user-token.view-model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { RegisterUserViewModel } from "../models/register-user.view-model";
import { TokenViewModel } from "../models/token.view-model";
import { AuthUserViewModel } from "../models/auth-user.view-model";
import { LocalStorageService } from "./local-storage.service";

@Injectable()
export class AuthService {
  private API_URL = `${environment.API_URL}/accounts`
  
  private endpointRegister: string = this.API_URL + '/register'
  private endpointLogin: string = this.API_URL + '/login';
  private endpointLogout: string = this.API_URL + '/logout';

  private authenticatedUser: BehaviorSubject<UserTokenViewModel | undefined>;

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.localStorage.getSavedLocalData()?.key}`
    })
  };

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {
    this.authenticatedUser = new BehaviorSubject<UserTokenViewModel | undefined>(undefined)
  }

  public getAuthenticatedUser() {
    return this.authenticatedUser.asObservable();
  }
  
  public register(user: RegisterUserViewModel): Observable<TokenViewModel> {
    return this.http.post<any>(this.endpointRegister, user).pipe(
      map((res) => res.data),
      tap((data: TokenViewModel) => this.localStorage.saveUserLocalData(data)),
      catchError((err) => this.handleHttpError(err))
    );
  }

  public login(user: AuthUserViewModel): Observable<TokenViewModel> {
    return this.http.post<any>(this.endpointLogin, user)
      .pipe(map((res) => res.data),
      tap((data: TokenViewModel) =>
        this.localStorage.saveUserLocalData(data)
      ),
      tap((data: TokenViewModel) => this.notifyLogin(data.user)),
      catchError((err) => this.handleHttpError(err))
    );
  }

  public logout(): Observable<any> {
    return this.http
      .post<any>(this.endpointLogout, {}, this.httpOptions)
      .pipe(
        tap(() => this.notifyLogout()),
        tap(() => this.localStorage.clearLocalData())
      );
  }

  public loginSavedUser(): void {
    const data = this.localStorage.getSavedLocalData();

    if (!data) return;

    const tokenIsValid: boolean = new Date(data.expirationDate) > new Date();

    if (tokenIsValid) this.notifyLogin(data.user);
  }

  public notifyLogin(user: UserTokenViewModel): void {
    this.authenticatedUser.next(user);
  }

  private notifyLogout(): void {
    this.authenticatedUser.next(undefined);
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