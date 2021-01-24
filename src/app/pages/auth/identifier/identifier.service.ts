import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '@services/auth.service';

import { HttpResponse } from '@interfaces/http-response.interface';

@Injectable()
export class IdentifierService {

    constructor(private _authService: AuthService) { }

    /**
     * Check if the user has an active workspace
     * @return True, yes it has, otherwise false
     */
    checkHasActiveWorkspace(): boolean {
        return this._authService.checkHasActiveWorkspace();
    }

    /**
     * Check if user is logged in
     * @return True if user is logged in, otherwise false
     */
    checkIsLoggedIn(): boolean {
        return this._authService.checkIsLoggedIn();
    }

    /**
     * Identifies the user
     * @param  authToken Auth token
     * @return           Access token
     */
    identifyUser(authToken: string): Observable<HttpResponse> {
        return this._authService.identifyUser(authToken);
    }

    /**
     * Login to Agenthos
     * @param userToken User token
     */
    startSessionInAgethos(userToken: string): void {
        this._authService.startSessionInAgethos(userToken);
    }
}
