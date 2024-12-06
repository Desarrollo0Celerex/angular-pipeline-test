import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AUTH_ROUTES } from '@core/constants/routes';

@Component({
    selector: 'agt-not-authenticated',
    templateUrl: './not-authenticated.page.html',
    styles: [],
})
export class NotAuthenticatedPage {
    loginLink: string = `/${AUTH_ROUTES.MODULE}/${AUTH_ROUTES.LOGIN}`;
    redirectUrl =
        this._activatedRoute.snapshot.queryParams['redirectUrl'] || '';

    constructor(private _activatedRoute: ActivatedRoute) {}
}
