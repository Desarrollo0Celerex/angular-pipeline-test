import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { ROUTES_NAME } from '@constants/routes-name';
import { AuthService } from '@features/auth/services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class UserAuthenticatedGuard implements CanActivate {
    constructor(private _authService: AuthService, private _router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (this._authService.checkIsLoggedIn()) {
            return true;
        }
        this._router.navigateByUrl(ROUTES_NAME.notAuthenticated);
        return false;
    }
}
