import { Component } from '@angular/core';

import { AUTH_ROUTES } from '@core/constants/routes';

@Component({
    selector: 'agt-not-authenticated',
    templateUrl: './not-authenticated.page.html',
    styles: [],
})
export class NotAuthenticatedPage {
    loginLink: string = `/${AUTH_ROUTES.MODULE}/${AUTH_ROUTES.LOGIN}`;
}
