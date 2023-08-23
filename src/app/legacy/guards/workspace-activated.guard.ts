import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
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
export class WorkspaceActivatedGuard implements CanActivate {
    constructor(private _authService: AuthService, private _router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (this._authService.checkHasActiveWorkspace()) {
            return true;
        } else {
            this._router.navigateByUrl(ROUTES_NAME.checkWorkspaceStatus);
            return false;
        }
    }
}
