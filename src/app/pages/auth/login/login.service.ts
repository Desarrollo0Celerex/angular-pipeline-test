import { Injectable } from '@angular/core';

import { AuthService } from '@services/auth/auth.service';

@Injectable()
export class LoginService {

    constructor(private _authService: AuthService) { }

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
    getRedirectUrl(): string | null {
        // TODO: obtener la url de redireccionamiento
        return null;
    }
}
