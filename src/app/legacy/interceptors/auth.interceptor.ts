import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { StorageService } from '@core/services/storage/storage.service';

const TOKEN_HEADER_KEY: string = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private _storageService: StorageService) {}

    /**
     * If there is an user token add it to the request headers
     * @param  request Request
     * @param  next    Next
     * @return         New Request
     */
    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const userToken: string | null = this._storageService.getUserToken();
        const isRequestDownloadFileFromAWS: boolean =
            this._checkIsRequestDownloadFileFromAWS(request.url) ? true : false;
        if (userToken !== null && !isRequestDownloadFileFromAWS) {
            request = request.clone({
                headers: request.headers.set(
                    TOKEN_HEADER_KEY,
                    `Bearer ${userToken}`
                ),
            });
        }
        return next.handle(request);
    }

    private _checkIsRequestDownloadFileFromAWS(url: string): boolean {
        return (
            url.includes('s3.amazonaws.com') ||
            url.includes('storage.agenthos.com')
        );
    }
}

export const AUTH_INTERCEPTOR_PROVIDER = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
