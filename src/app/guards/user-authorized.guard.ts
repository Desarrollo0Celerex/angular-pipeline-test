import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { ROUTES_NAME } from '@constants/routes-name';
import { AuthService } from '@services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthorizedGuard implements CanActivate {

    constructor(
        private _authService: AuthService,
        private _router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const roles = route.data.roles;
        const hasPermission: boolean = this._authService.checkHasPermission(roles);
        if(hasPermission) {
            return true;
        } else {
            this._router.navigateByUrl(ROUTES_NAME.accessDenied);
            return false;
        }
    }

}
