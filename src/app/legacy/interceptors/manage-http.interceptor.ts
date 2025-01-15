import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ActivationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { HttpCancelService } from '@services/http-cancel.service';

@Injectable()
export class ManageHttpInterceptor implements HttpInterceptor {

    constructor(
        private _httpCancelService: HttpCancelService,
        private _router: Router
    ) {
        this._router.events.subscribe(event => {
            if(event instanceof ActivationEnd) {
                this._httpCancelService.cancelPendingRequests();
            }
        })
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(takeUntil(this._httpCancelService.onCancelPendingRequests()));
    }
}

export const MANAGE_HTTP_INTERCEPTOR_PROVIDER = [ { provide: HTTP_INTERCEPTORS, useClass: ManageHttpInterceptor, multi: true } ];
