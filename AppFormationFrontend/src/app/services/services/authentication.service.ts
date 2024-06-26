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
import { logout } from '../fn/authentication/logout';
import { Logout$Params } from '../fn/authentication/logout';
import { register } from '../fn/authentication/register';
import { Register$Params } from '../fn/authentication/register';
import { registerAdmin } from '../fn/authentication/register-admin';
import { RegisterAdmin$Params } from '../fn/authentication/register-admin';
import { registerInstructor } from '../fn/authentication/register-instructor';
import { RegisterInstructor$Params } from '../fn/authentication/register-instructor';
import { registerParticipant } from '../fn/authentication/register-participant';
import { RegisterParticipant$Params } from '../fn/authentication/register-participant';
import { uploadFile } from '../fn/authentication/upload-file';
import { UploadFile$Params } from '../fn/authentication/upload-file';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `uploadFile()` */
  static readonly UploadFilePath = '/auth/uploadFile/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadFile()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadFile$Response(params: UploadFile$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadFile(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadFile$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadFile(params: UploadFile$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadFile$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
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

  /** Path part for operation `registerAdmin()` */
  static readonly RegisterAdminPath = '/auth/registerAdmin';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerAdmin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerAdmin$Response(params: RegisterAdmin$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return registerAdmin(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerAdmin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerAdmin(params: RegisterAdmin$Params, context?: HttpContext): Observable<{
}> {
    return this.registerAdmin$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `logout()` */
  static readonly LogoutPath = '/auth/logout';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `logout()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout$Response(params?: Logout$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return logout(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `logout$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout(params?: Logout$Params, context?: HttpContext): Observable<void> {
    return this.logout$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
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
