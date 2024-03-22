import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { AuthenService } from '../services/auth.service';
import { catchError, switchMap, filter, take, map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { SystemConstants } from '../constants/systems.constant';
import { ResponseData } from '../models';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthResponseInterceptor implements HttpInterceptor {
    private refreshTokenInProgress = false;

    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private authService: AuthenService,
        private router: Router
        
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request.clone({
                setHeaders: {
                    Authorization: `${this.authService.authorizationHeaderValue}`
                }
            }))
            .pipe(
                // map(
                //     (event: HttpResponse<any>) => {
                //         console.log(event.body)
                //         return event
                //     },
                // ),
                catchError((error: any) => {
                    // error authorization
                    if (error instanceof HttpErrorResponse && error.status === 401) {
                        // get user token and refresh_token
                        const currentUserInfo = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER) as string);
                        if (currentUserInfo.access_token && currentUserInfo.refresh_token) {
                            // send refresh_token to get new access token
                            currentUserInfo.refresh_token = currentUserInfo.refresh_token + SystemConstants.KEY_SECRET;
                            // const decoded = jwt_decode(currentUserInfo.access_token);

                            if (this.refreshTokenInProgress) {
                                // in process refresh token, subrequest will wait until refreshtokensubject return not null value
                                return this.refreshTokenSubject.pipe(
                                    filter(result => result !== null),
                                    take(1),
                                    switchMap(() => next.handle(this.addAuthHeaderAccessToken(request)))
                                );
                            } else {
                                // in process refresh token
                                this.refreshTokenInProgress = true;
                                this.refreshTokenSubject.next(null);
                                return this.authService.refreshToken(currentUserInfo.refresh_token)
                                .pipe(
                                    switchMap((response: any) => {
                                        if (response.Status.Code === 1) {
                                            currentUserInfo.access_token = response.Data.access_token;
                                            currentUserInfo.refresh_token = response.Data.refresh_token;

                                            // save new tokens
                                            localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(currentUserInfo));

                                            // end process refresh token
                                            this.refreshTokenInProgress = false;
                                            this.refreshTokenSubject.next(currentUserInfo.refresh_token);

                                            // resend previous request
                                            return next.handle(this.addAuthHeaderAccessToken(request));
                                        } else if (response.Status.Code === -1) {
                                            // refresh token fail
                                            this.refreshTokenInProgress = false;
                                            // delete user data
                                            localStorage.removeItem(SystemConstants.CURRENT_USER);
                                            this.router.navigate(['/login']).then(()=>{
                                                // response.Status.Code = 401;
                                                response.Status.Message = 'Hết phiên đăng nhập';
                                                // console.log('dkfjd');
                                                return throwError(()=>response);

                                            });
                                        }
                                        // console.log('dfjdkf');
                                        return throwError(()=>response);
                                    })
                                );
                            }
                        } else {
                            // console.log('navigate To Login');
                            this.router.navigate(['/login']);
                        }
                    }
                    return throwError(()=>error);
                })
            );
    }

    addAuthHeaderAccessToken(request: HttpRequest<any>) {
        return request.clone({
            setHeaders: {
                Authorization: `${this.authService.authorizationHeaderValue}`
            }
        });
    }
}
