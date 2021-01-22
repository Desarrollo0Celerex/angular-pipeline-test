import { Injectable } from '@angular/core';

@Injectable()
export class AuthLoginService {

    constructor() { }

    /**
     * Check if user is logged in
     * @return True if user is logged in, otherwise false
     */
    checkIsLoggedIn(): boolean {
        // TODO: Revisar si el usuario ya esta conectado
        return false;
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
