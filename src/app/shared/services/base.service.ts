import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, throwError } from 'rxjs';
import { SystemConstants } from '../constants/systems.constant';

export const signal = new Subject();

export abstract class BaseService {

    constructor() {
        signal.subscribe(() => {
            this.currentUser = null;
        });
    }
    public currentUser: any;
    get User() {
        this.currentUser = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER) as string);
        if (this.currentUser) {
            return this.currentUser;
        } else {
            return null;
        }
    }
    protected handleError(error: any) {
        let errorMessage = '';
        if (error && error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status??error.Status.Code}\nMessage: ${error.message??error.Status.Message}`;
            }
            // console.log(errorMessage);
        return throwError(() => {
            return errorMessage;
        });
        // let errorMessage = '';
        // if(error){
        //     if (error.status === 0) {
        //     // A client-side or network error occurred. Handle it accordingly.
        //         console.error('Lỗi:', error.error);
        //     } else {
        //         // The backend returned an unsuccessful response code.
        //         // The response body may contain clues as to what went wrong.
        //         console.error(
        //         `Lỗi hệ thống: ${error.status??error.Status.Code}, chi tiết: `, error.error??error.Status.Message);
        //     }
        // }
        // errorMessage = Error: Code: 1, Merr ${'Có lỗi xảy ra ở máy chủ, hãy thử lại lần nữa.'};
        // // Return an observable with a user-facing error message.
        // return throwError(errorMessage);
        // // console.error('Có lỗi xảy ra ở máy chủ, hãy thử lại lần nữa.');
    }
}
