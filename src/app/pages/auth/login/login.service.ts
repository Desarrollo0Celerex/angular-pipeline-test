import { Injectable } from '@angular/core';

import { AuthService } from '@services/auth.service';
import { RoutingHistoryService } from '@services/routing-history.service';

@Injectable()
export class LoginService {

    constructor(
        private _authService: AuthService,
        private _routingHistoryService: RoutingHistoryService
    ) { }

    /**
     * Check if user is logged in
     * @return True if user is logged in, otherwise false
     */
    checkIsLoggedIn(): boolean {
        return this._authService.checkIsLoggedIn();
    }

    /**
     * Get the redirect url
     * @return Redirect url
     */
    getRedirectUrl(): string {
        return (this._routingHistoryService.getPreviousUrl() !== '/') ? this._routingHistoryService.getPreviousUrl() : '';
    }
}
