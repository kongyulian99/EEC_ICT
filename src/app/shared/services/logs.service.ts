import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from './base.service';
import { ResponseData } from '../models';
import { SystemConstants } from '../constants';
// import { Role } from '../models/role';
@Injectable({
    providedIn: 'root' // ADDED providedIn root here.
})
export class LogsService extends BaseService {
    private httpOptions = new HttpHeaders();

    constructor(private http: HttpClient) {
        super();
        this.httpOptions = this.httpOptions.set('Content-Type', 'application/json');
    }
    insert(entity: any) {
        return this.http.post<ResponseData>(`${SystemConstants.API_URL}/api/logs/insert`, entity, { headers: this.httpOptions })
            .pipe(catchError(this.handleError));
    }
    update(entity: any) {
        return this.http.post<ResponseData>(`${SystemConstants.API_URL}/api/logs/update`, entity, { headers: this.httpOptions })
            .pipe(catchError(this.handleError));
    }

    selectForFilter(keyword: string, tungay: Date, denngay: Date, pageindex: number, pagesize: number) {
        // tslint:disable-next-line:max-line-length
        return this.http.get<ResponseData>(`${SystemConstants.API_URL}/api/logs/selectbyfilter?pageindex=${pageindex}&pagesize=${pagesize}&keyword=${keyword}&tungay=${tungay.toISOString()}&denngay=${denngay.toISOString()}`, { headers: this.httpOptions })
        .pipe(catchError(this.handleError));
    }
}
