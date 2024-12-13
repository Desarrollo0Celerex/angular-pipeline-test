import { Injectable } from '@angular/core';
import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { ROUTES_NAME } from '@constants/routes-name';
import { AuthService } from '@features-legacy/auth/services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class UserAuthenticatedGuard implements CanActivate {
    private _redirectUrl = '';

    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (this._authService.checkIsLoggedIn()) {
            //TODO: Check if the user is an active user.
            return true;
        }
        const redirectUrl = state.url || '';
        if (!this._redirectUrl) {
            this._redirectUrl = redirectUrl;
        }
        this._router.navigate([ROUTES_NAME.notAuthenticated], {
            queryParams: { redirectUrl: this._redirectUrl },
        });
        return false;
    }
}
