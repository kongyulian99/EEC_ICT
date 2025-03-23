import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { ResponseData } from '../models';
import { SystemConstants } from '../constants';
@Injectable({
  providedIn: 'root', // ADDED providedIn root here.
})
export class TestResultService extends BaseService {
  private httpOptions = new HttpHeaders();

  constructor(private http: HttpClient) {
    super();
    this.httpOptions = this.httpOptions.set('Content-Type', 'application/json');
  }
  selectMaxScoreByUser(userId, nam: any) {
    return (
      this.http
        // tslint:disable-next-line:max-line-length
        .get<ResponseData>(
          `${SystemConstants.API_URL}/api/TestResults/getMaxScoreByUser?userId=${userId}&nam=${nam}`,
          { headers: this.httpOptions }
        )
        .pipe(catchError(this.handleError))
    );
  }

  selectAvgScoreByUser(userId, nam) {
    return (
      this.http
        // tslint:disable-next-line:max-line-length
        .get<ResponseData>(
          `${SystemConstants.API_URL}/api/TestResults/getAverageScoreByUser?userId=${userId}&nam=${nam}`,
          { headers: this.httpOptions }
        )
        .pipe(catchError(this.handleError))
    );
  }
  selectScoreByTopic(userId, TopicId) {
    return(
      this.http
        .get<ResponseData>(
          `${SystemConstants.API_URL}/api/QuestionResults/getAverageScoreByTopic?userId=${userId}&TopicId=${TopicId}`,
          {headers: this.httpOptions}
        )
        .pipe(catchError(this.handleError))
    );
    
  }
}
