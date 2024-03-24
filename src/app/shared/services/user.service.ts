import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { ResponseData } from '../models';
import { SystemConstants } from '../constants';
@Injectable({
    providedIn: 'root' // ADDED providedIn root here.
})
export class UserService extends BaseService {
    private httpOptions = new HttpHeaders();

    constructor(private http: HttpClient) {
        super();
        this.httpOptions = this.httpOptions.set('Content-Type', 'application/json');
    }
    insert(entity: any) {
        return this.http.post<ResponseData>(`${SystemConstants.API_URL}/api/users/insert`, entity, { headers: this.httpOptions })
            .pipe(catchError(this.handleError));
    }
    update(entity: any) {
        return this.http.post<ResponseData>(`${SystemConstants.API_URL}/api/users/update`, entity, { headers: this.httpOptions })
            .pipe(catchError(this.handleError));
    }
    selectAll(pageindex: number, pagesize: number, keyword: string) {
        return this.http.get<ResponseData>(`${SystemConstants.API_URL}/api/users/selectAll?pageindex=${pageindex}&pagesize=${pagesize}&filter=${keyword}`, { headers: this.httpOptions })
            .pipe(catchError(this.handleError));
    }
    selectAllByPermission(id: string,pageindex: number, pagesize: number, keyword: string) {
        return this.http.get<ResponseData>(`${SystemConstants.API_URL}/api/users/selectallbypermission/${id}?pageindex=${pageindex}&pagesize=${pagesize}&filter=${keyword}`, { headers: this.httpOptions })
            .pipe(catchError(this.handleError));
    }

    selectByDonViAndNhom(madonvi: string, role, keyword: string,pageindex: number, pagesize: number) {
        return this.http.get<ResponseData>(`${SystemConstants.API_URL}/api/users/selectbydonviandnhom?pageindex=${pageindex}&pagesize=${pagesize}&keyword=${keyword}&madonvi=${madonvi}&role=${role}`, { headers: this.httpOptions })
            .pipe(catchError(this.handleError));
    }

    selectOne(id: string) {
        return this.http.get<ResponseData>(`${SystemConstants.API_URL}/api/users/selectOne/${id}`, { headers: this.httpOptions })
            .pipe(catchError(this.handleError));
    }
    updateCommonInfo(entity: any) {
        return this.http.put<ResponseData>(`${SystemConstants.API_URL}/api/users/update-commoninfo`, entity, { headers: this.httpOptions })
            .pipe(catchError(this.handleError));
    }
    updatePasword (userId: string, newPassword: string, oldPassword: string) {
        return this.http.put<ResponseData>(`${SystemConstants.API_URL}/api/users/update-password/${userId}?oldPassword=${oldPassword}&newPassword=${newPassword}`, { headers: this.httpOptions })
            .pipe(catchError(this.handleError));
    }
    resetPasword (userId: string) {
        return this.http.put<ResponseData>(`${SystemConstants.API_URL}/api/users/reset-password?userId=${userId}`, { headers: this.httpOptions })
            .pipe(catchError(this.handleError));
    }
    delete(id: string) {
        return this.http.delete<ResponseData>(`${SystemConstants.API_URL}/api/users/delete/${id}`, { headers: this.httpOptions })
            .pipe(catchError(this.handleError));
    }
    checkUserName(body: any) {
        return this.http.post<ResponseData>(`${SystemConstants.API_URL}/api/users/checkusername`,body, { headers: this.httpOptions })
            .pipe(catchError(this.handleError));
    }
    getRoles(userId: string) {
        return this.http.get<ResponseData>(`${SystemConstants.API_URL}/api/users/getroles/${userId}`, { headers: this.httpOptions })
            .pipe(catchError(this.handleError));
    }
    addRoles(userId: string, roleIds: Number[]) {
      // debugger;
        let query = '';
        for (const id of roleIds) {
            query += 'roleIds=' + id + '&';
        }
        return this.http
            .post<ResponseData>(`${SystemConstants.API_URL}/api/users/insertrole/${userId}?${query}`, { headers: this.httpOptions })
            .pipe(catchError(this.handleError));
    }
    removeRoles(userId: string, roleIds: number[]) {
        let query = '';
        for (const id of roleIds) {
            query += 'roleIds=' + id + '&';
        }
        query = query.slice(0, -1);
        return this.http
            .post<ResponseData>(`${SystemConstants.API_URL}/api/users/removerole/${userId}?${query}`, {})
            .pipe(catchError(this.handleError));
    }

  // chuyên ngành
  getChuyenNganh(userId: string) {
    return this.http.get<ResponseData>(`${SystemConstants.API_URL}/api/users/getchuyennganh/${userId}`, { headers: this.httpOptions })
      .pipe(catchError(this.handleError));
  }
  addChuyenNganh(userId: string, idChuyenNganhs: number[]) {
    // debugger;
    let query = '';
    for (const id of idChuyenNganhs) {
      query += 'idChuyenNganhs=' + id + '&';
    }
    query = query.slice(0, -1);
    return this.http
      .post<ResponseData>(`${SystemConstants.API_URL}/api/users/insertchuyennganh/${userId}?${query}`, { headers: this.httpOptions })
      .pipe(catchError(this.handleError));
  }
  removeChuyenNganh(userId: string, idChuyenNganh: number) {
    // debugger;
    return this.http
        .post<ResponseData>(`${SystemConstants.API_URL}/api/users/removechuyennganh/${userId}?idChuyenNganh=${idChuyenNganh}`, {})
        .pipe(catchError(this.handleError));
}
}
