import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from './base.service';
import { SystemConstants } from '../constants/systems.constant';
import { User } from '../interfaces/user.interface';
import { ResponseData } from '../models';

@Injectable({
  providedIn: 'root' // ADDED providedIn root here.
})
export class AuthenService extends BaseService {
  private httpOptions = new HttpHeaders();
  private user!: User;

  constructor(private http: HttpClient,
    private notificationService: NotificationService
    ) {
    super();
    this.httpOptions = this.httpOptions.set('Content-Type', 'application/json');
  }
  login(username: string, password: string) {
    const body = {
      UserName: username,
      Password: password
    };
    return this.http.post<ResponseData>(`/api/users/login`, body, { headers: this.httpOptions })
      .pipe(catchError(this.handleError));
  }

  refreshToken(refresh: string) {
    return this.http
    .post<ResponseData>(`/api/refreshtoken/refresh?refreshToken=${refresh}`,
      // { headers: this.httpOptions }).pipe(catchError(this.handleError));
      { headers: this.httpOptions }).pipe(map((response: ResponseData)=>{
        if(response.Status.Code == -1){
          this.notificationService.showError('Hết phiên đăng nhập!');
            // this.router.navigate(['/login']);
        } 
        return response;
      }))
  }


  isAuthenticated() {
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER) as string);
    if (this.user) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    const refreshToken = this.user.refresh_token + SystemConstants.KEY_SECRET;
    return this.http.post<ResponseData>(`/api/users/logout/${refreshToken}`,
      { headers: this.httpOptions })
      .pipe(catchError(this.handleError));
  }

  get authorizationHeaderValue(): string | null {
    const currentUser = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER) as string);
    if (currentUser) {
      return `${currentUser.token_type} ${currentUser.access_token}${SystemConstants.KEY_SECRET}`;
    }
    return null;
  }
}
