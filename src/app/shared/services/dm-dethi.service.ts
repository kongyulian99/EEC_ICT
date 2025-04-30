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
export class DMDethiService extends BaseService {
  private httpOptions = new HttpHeaders();

  constructor(private http: HttpClient) {
    super();
    this.httpOptions = this.httpOptions.set('Content-Type', 'application/json');
  }
  selectAll(pageSize: number, pageIndex: number, filter: string) {
    return (
      this.http
        // tslint:disable-next-line:max-line-length
        .get<ResponseData>(
          `${environment.apiUrl}/api/dm-dethi/SelectAll?pageindex=${pageIndex.toString()}&pagesize=${pageSize.toString()}&filter=${filter}`,
          { headers: this.httpOptions }
        )
        .pipe(catchError(this.handleError))
    );
  }
  selectOne(maDethi: string) {
    return (
      this.http
        // tslint:disable-next-line:max-line-length
        .get<ResponseData>(`${environment.apiUrl}/api/dm-dethi/selectone/${maDethi}`, {
          headers: this.httpOptions,
        })
        .pipe(catchError(this.handleError))
    );
  }

  selectOneForTest(maDethi: string) {
    return (
      this.http
        // tslint:disable-next-line:max-line-length
        .get<ResponseData>(`${environment.apiUrl}/api/dm-dethi/selectonefortest/${maDethi}`, {
          headers: this.httpOptions,
        })
        .pipe(catchError(this.handleError))
    );
  }

  insert(entity: any) {
    return this.http
      .post<ResponseData>(`${environment.apiUrl}/api/dm-dethi/insert`, entity, {
        headers: this.httpOptions,
      })
      .pipe(catchError(this.handleError));
  }
  update(entity: any) {
    return this.http
      .put<ResponseData>(`${environment.apiUrl}/api/dm-dethi/update`, entity, {
        headers: this.httpOptions,
      })
      .pipe(catchError(this.handleError));
  }

  submit(entity: any) {
    return this.http
      .put<ResponseData>(`${environment.apiUrl}/api/dm-dethi/submit`, entity, {
        headers: this.httpOptions,
      })
      .pipe(catchError(this.handleError));
  }

  delete(maDethi: string) {
    return this.http
      .delete<ResponseData>(`${environment.apiUrl}/api/dm-dethi/delete/${maDethi}`, {
        headers: this.httpOptions,
      })
      .pipe(catchError(this.handleError));
  }
  checkDuplicate(ma: string) {
    return this.http
      .post<ResponseData>(`${environment.apiUrl}/api/dm-dethi/checkDuplicate?ma=${ma}`, {
        headers: this.httpOptions,
      })
      .pipe(catchError(this.handleError));
  }

  checkCorrect(listRequest: any, userId: string) {
    return this.http
      .post<ResponseData>(`${environment.apiUrl}/api/dm-dethi/checkCorrect?userId=${userId}`, listRequest, {
        headers: this.httpOptions,
      })
      .pipe(catchError(this.handleError));
  }
}
