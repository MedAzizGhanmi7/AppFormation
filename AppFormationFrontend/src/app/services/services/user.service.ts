/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findAll } from '../fn/user/find-all';
import { FindAll$Params } from '../fn/user/find-all';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAll()` */
  static readonly FindAllPath = '/user/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  /*findAll$Response(params?: FindAll$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<User>>> {
    return findAll(this.http, this.rootUrl, params, context);
  }*/

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  /*findAll(params?: FindAll$Params, context?: HttpContext): Observable<Array<User>> {
    return this.findAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<User>>): Array<User> => r.body)
    );
  }*/

    findAll(): Observable<User[]> {
      return this.http.get<User[]>("http://localhost:8081/api/v1/user/all");
    }

    findAllInstructors(sessionId: number): Observable<User[]> {
      return this.http.get<User[]>(`http://localhost:8081/api/v1/user/allInstructors/${sessionId}`)
        .pipe(
          catchError((error) => {
            console.error('Find all instructors error:', error);
            return throwError(error);
          })
        );
    }


    toggleUserAccount(userId: number) {
      return this.http.put<any>(`http://localhost:8081/api/v1/user/toggleAccount/${userId}`, null, { responseType: 'text' as 'json' })
        .pipe(
          catchError((error) => {
            console.error('Toggle account error:', error);
            return throwError(error);
          })
        );
    }

    deleteUserAccount(userId: number): Observable<string> {
      return this.http.delete<string>(`http://localhost:8081/api/v1/user/delete/${userId}`, { responseType: 'text' as 'json' })
        .pipe(
          catchError((error) => {
            console.error('Delete account error:', error);
            return throwError(error);
          })
        );
    }

    getUserById(userId: number): Observable<User> {
      return this.http.get<User>(`http://localhost:8081/api/v1/user/${userId}`)
        .pipe(
          catchError((error) => {
            console.error('Get user by ID error:', error);
            return throwError(error);
          })
        );
    }

    getUserByEmail(email: string): Observable<User> {
      return this.http.get<User>(`http://localhost:8081/api/v1/user/partipant/${email}`)
        .pipe(
          catchError((error) => {
            console.error('Get user by ID error:', error);
            return throwError(error);
          })
        );
    }


}
