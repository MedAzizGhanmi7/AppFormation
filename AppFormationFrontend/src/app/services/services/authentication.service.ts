/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { authenticate } from '../fn/authentication/authenticate';
import { Authenticate$Params } from '../fn/authentication/authenticate';
import { AuthenticationResponse } from '../models/authentication-response';
import { confirm } from '../fn/authentication/confirm';
import { Confirm$Params } from '../fn/authentication/confirm';
import { register } from '../fn/authentication/register';
import { Register$Params } from '../fn/authentication/register';
import { registerInstructor } from '../fn/authentication/register-instructor';
import { RegisterInstructor$Params } from '../fn/authentication/register-instructor';
import { registerParticipant } from '../fn/authentication/register-participant';
import { RegisterParticipant$Params } from '../fn/authentication/register-participant';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `register()` */
  static readonly RegisterPath = '/auth/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register$Response(params: Register$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return register(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register(params: Register$Params, context?: HttpContext): Observable<{
}> {
    return this.register$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `registerParticipant()` */
  static readonly RegisterParticipantPath = '/auth/registerParticipant';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerParticipant()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerParticipant$Response(params: RegisterParticipant$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return registerParticipant(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerParticipant$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerParticipant(params: RegisterParticipant$Params, context?: HttpContext): Observable<{
}> {
    return this.registerParticipant$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `registerInstructor()` */
  static readonly RegisterInstructorPath = '/auth/registerInstructor';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerInstructor()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerInstructor$Response(params: RegisterInstructor$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return registerInstructor(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerInstructor$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerInstructor(params: RegisterInstructor$Params, context?: HttpContext): Observable<{
}> {
    return this.registerInstructor$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `authenticate()` */
  static readonly AuthenticatePath = '/auth/authenticate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticate$Response(params: Authenticate$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
    return authenticate(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authenticate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticate(params: Authenticate$Params, context?: HttpContext): Observable<AuthenticationResponse> {
    return this.authenticate$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>): AuthenticationResponse => r.body)
    );
  }

  /** Path part for operation `confirm()` */
  static readonly ConfirmPath = '/auth/activate-account';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `confirm()` instead.
   *
   * This method doesn't expect any request body.
   */
  confirm$Response(params: Confirm$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return confirm(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `confirm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  confirm(params: Confirm$Params, context?: HttpContext): Observable<void> {
    return this.confirm$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
