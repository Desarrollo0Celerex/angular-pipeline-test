import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ERROR_CODES } from '@constants/error-codes';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { HttpError } from '@interfaces/http-error.interface';

import { LoadingService } from '@core/services/loading.service';
import { ScanningService } from '@services/scanning.service';
import { HttpCancelService } from '@services/http-cancel.service';

declare var ModalPlugin: any;

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private _isModalShown: boolean = false;

    constructor(
        private _loadingService: LoadingService,
        private _router: Router,
        private _scanningService: ScanningService,
        private _httpCancelService: HttpCancelService
    ) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error: any) => {
                this._loadingService.hide();
                const errorMessage = error.error || error.statusText;
                this._handlerHttpErrors(errorMessage);
                return throwError(errorMessage);
            })
        );
    }

    private _handlerHttpErrors(error: HttpError): void {
        switch (error.error) {
            case ERROR_CODES.internalServerError:
            case ERROR_CODES.invitationNotFound:
            case ERROR_CODES.invalidInvitationStatus:
            case ERROR_CODES.errorAcceptingInvitation:
            case ERROR_CODES.roleNotFound:
            case ERROR_CODES.invalidFilter:
            case ERROR_CODES.errorSendingInvitation:
            case ERROR_CODES.errorSendingEmail:
                AlertHelper.globalError();
                break;

            case ERROR_CODES.forbiddenAccess:
                this._loadingService.hide();
                setTimeout(() => {
                    this._scanningService.hide();
                }, 500);
                AlertHelper.forbiddenAccess();
                break;

            case ERROR_CODES.invalidAuthToken:
                AlertHelper.invalidAuthToken();
                break;

            case ERROR_CODES.invalidUserToken:
                if (!this._isModalShown) {
                    this._isModalShown = true;
                    ModalPlugin.show('modal-session-expired');
                }
                break;

            case ERROR_CODES.invalidFields:
                AlertHelper.invalidFields();
                break;

            case ERROR_CODES.invitationSendAttemptsExceeded:
                AlertHelper.invitationSendAttemptsExceeded();
                break;

            case ERROR_CODES.invalidExpressToken:
                this._router.navigateByUrl(ROUTES_NAME.invalidExpressToken);
                break;

            case ERROR_CODES.contactNotFound:
                this._router.navigateByUrl(ROUTES_NAME.contactNotFound);
                break;

            case ERROR_CODES.workspaceUserNotFound:
                this._httpCancelService.cancelPendingRequests();
                ModalPlugin.show('modal-workspace-user-not-found');
                break;
        }
    }
}

export const ERROR_INTERCEPTOR_PROVIDER = [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];
