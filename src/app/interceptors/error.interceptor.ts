import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { ERROR_CODES } from '@constants/error-codes';
import { AlertHelper } from '@helpers/alert.helper';
import { HttpError } from '@interfaces/http-error.interface';
import { LoadingService } from '@services/loading.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private _loadingService: LoadingService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      return next.handle(request).pipe(
              catchError( (error: any) => {
                  this._loadingService.hide();
                  const errorMessage = error.error || error.statusText;
                  this._handlerHttpErrors(errorMessage);
                  return throwError(errorMessage);
              })
          )
    }

    private _handlerHttpErrors(error: HttpError): void {
        switch (error.error) {
            case ERROR_CODES.internalServerError:
            case ERROR_CODES.invitationNotFound:
            case ERROR_CODES.invalidInvitationStatus:
            case ERROR_CODES.errorAcceptingInvitation:
            case ERROR_CODES.roleNotFound:
            case ERROR_CODES.invalidFilter:
            case ERROR_CODES.workspaceUserNotFound:
            case ERROR_CODES.errorSendingInvitation:
            case ERROR_CODES.errorSendingEmail:
                AlertHelper.globalError();
                break;

            case ERROR_CODES.invalidAuthToken:
                AlertHelper.invalidAuthToken();
                break;

            case ERROR_CODES.invalidFields:
                AlertHelper.invalidFields();
                break;

            case ERROR_CODES.invitationSendAttemptsExceeded:
                AlertHelper.invitationSendAttemptsExceeded();
                break;
        }
    }
}

export const ERROR_INTERCEPTOR_PROVIDER = [ { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true } ];
