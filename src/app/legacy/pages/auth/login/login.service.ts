import { Injectable } from '@angular/core';

import { AuthService } from '@services/auth.service';

@Injectable()
export class LoginService {

    constructor(
        private _authService: AuthService
    ) { }

    /**
     * Check if user is logged in
     * @return True if user is logged in, otherwise false
     */
    checkIsLoggedIn(): boolean {
        return this._authService.checkIsLoggedIn();
    }

    /**
     * Go to Atom account login
     */
    goToAtomAccount(): void {
        this._authService.goToAtomAccount();
    }
}
