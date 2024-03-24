import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { catchError} from 'rxjs/operators';
import { PermissionUpdateRequest } from '../models/permission-update';
import { ResponseData } from '../models';
import { SystemConstants } from '../constants';

@Injectable({ providedIn: 'root' })
export class PermissionService extends BaseService {
    private httpOptions = new HttpHeaders();
    constructor(private http: HttpClient) {
        super();
        this.httpOptions = this.httpOptions.set('Content-Type', 'application/json');
    }
    save(roleId: number, request: PermissionUpdateRequest) {
        return this.http.post<ResponseData>(`${SystemConstants.API_URL}/api/permissions/InsertWithRoleId/${roleId}`, request,
            { headers: this.httpOptions })
            .pipe(catchError(this.handleError));
    }

    getPermissionsByRole(roleId: string) {
        return this.http
        .get<ResponseData>(`${SystemConstants.API_URL}/api/permissions/SelectByRoleId/${roleId}`, { headers: this.httpOptions })
        .pipe(catchError(this.handleError));
    }
}
