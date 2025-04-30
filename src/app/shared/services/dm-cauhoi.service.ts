import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { ResponseData } from '../models';
import { SystemConstants } from '../constants';
import { environment } from 'src/environments/environment';
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
          `${environment.apiUrl}/api/dm-cauhoi/SelectAll?pageindex=${pageIndex.toString()}&pagesize=${pageSize.toString()}&filter=${filter}&topicId=${topicId}`,
          { headers: this.httpOptions }
        )
        .pipe(catchError(this.handleError))
    );
  }

  selectAllForTest(pageSize: number, pageIndex: number, filter: string, topicId: number) {
    return (
      this.http
        // tslint:disable-next-line:max-line-length
        .get<ResponseData>(
          `${environment.apiUrl}/api/dm-cauhoi/SelectAllForTest?pageindex=${pageIndex.toString()}&pagesize=${pageSize.toString()}&filter=${filter}&topicId=${topicId}`,
          { headers: this.httpOptions }
        )
        .pipe(catchError(this.handleError))
    );
  }

  selectOne(maCauhoi: string) {
    return (
      this.http
        // tslint:disable-next-line:max-line-length
        .get<ResponseData>(`${environment.apiUrl}/api/dm-cauhoi/selectone/${maCauhoi}`, {
          headers: this.httpOptions,
        })
        .pipe(catchError(this.handleError))
    );
  }
  insert(entity: any) {
    return this.http
      .post<ResponseData>(`${environment.apiUrl}/api/dm-cauhoi/insert`, entity, {
        headers: this.httpOptions,
      })
      .pipe(catchError(this.handleError));
  }
  update(entity: any) {
    return this.http
      .put<ResponseData>(`${environment.apiUrl}/api/dm-cauhoi/update`, entity, {
        headers: this.httpOptions,
      })
      .pipe(catchError(this.handleError));
  }
  delete(maCauhoi: string) {
    return this.http
      .delete<ResponseData>(`${environment.apiUrl}/api/dm-cauhoi/delete/${maCauhoi}`, {
        headers: this.httpOptions,
      })
      .pipe(catchError(this.handleError));
  }
  checkDuplicate(ma: string) {
    return this.http
      .post<ResponseData>(`${environment.apiUrl}/api/dm-cauhoi/checkDuplicate?ma=${ma}`, {
        headers: this.httpOptions,
      })
      .pipe(catchError(this.handleError));
  }

  checkCorrect(listRequest: any, userId: string) {
    return this.http
      .post<ResponseData>(`${environment.apiUrl}/api/dm-cauhoi/checkCorrect?userId=${userId}`, listRequest, {
        headers: this.httpOptions,
      })
      .pipe(catchError(this.handleError));
  }
}
