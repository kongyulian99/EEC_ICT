import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { ResponseData } from '../models';
import { SystemConstants } from '../constants';
@Injectable({
  providedIn: 'root', // ADDED providedIn root here.
})
export class DMCauhoiService extends BaseService {
  private httpOptions = new HttpHeaders();

  constructor(private http: HttpClient) {
    super();
    this.httpOptions = this.httpOptions.set('Content-Type', 'application/json');
  }
  selectAll(pageSize: number, pageIndex: number, filter: string, topicId: number) {
    return (
      this.http
        // tslint:disable-next-line:max-line-length
        .get<ResponseData>(
          `${SystemConstants.API_URL}/api/dm-cauhoi/SelectAll?pageindex=${pageIndex.toString()}&pagesize=${pageSize.toString()}&filter=${filter}&topicId=${topicId}`,
          { headers: this.httpOptions }
        )
        .pipe(catchError(this.handleError))
    );
  }
  selectOne(maCauhoi: string) {
    return (
      this.http
        // tslint:disable-next-line:max-line-length
        .get<ResponseData>(`${SystemConstants.API_URL}/api/dm-cauhoi/selectone/${maCauhoi}`, {
          headers: this.httpOptions,
        })
        .pipe(catchError(this.handleError))
    );
  }
  insert(entity: any) {
    return this.http
      .post<ResponseData>(`${SystemConstants.API_URL}/api/dm-cauhoi/insert`, entity, {
        headers: this.httpOptions,
      })
      .pipe(catchError(this.handleError));
  }
  update(entity: any) {
    return this.http
      .put<ResponseData>(`${SystemConstants.API_URL}/api/dm-cauhoi/update`, entity, {
        headers: this.httpOptions,
      })
      .pipe(catchError(this.handleError));
  }
  delete(maCauhoi: string) {
    return this.http
      .delete<ResponseData>(`${SystemConstants.API_URL}/api/dm-cauhoi/delete/${maCauhoi}`, {
        headers: this.httpOptions,
      })
      .pipe(catchError(this.handleError));
  }
  checkDuplicate(ma: string) {
    return this.http
      .post<ResponseData>(`${SystemConstants.API_URL}/api/dm-cauhoi/checkDuplicate?ma=${ma}`, {
        headers: this.httpOptions,
      })
      .pipe(catchError(this.handleError));
  }
}
