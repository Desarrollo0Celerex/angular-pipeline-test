import { Injectable } from '@angular/core';

import { UserTokenData } from '@interfaces/user-token-data.interface';

const USER_TOKEN_KEY: string = 'user-token';
const USER_DATA_KEY: string = 'user-data';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

    constructor() { }

    /**
     * Clear the storage
     */
    clearStorage(): void {
        localStorage.clear();
    }

    /**
     * Get the user token
     * @return User token
     */
    getUserToken(): string | null {
        return localStorage.getItem(USER_TOKEN_KEY);
    }

    /**
     * Get the user token data
     * @return User token data
     */
    getUserTokenData(): UserTokenData | null {
        const userTokenData: string | null = localStorage.getItem(USER_DATA_KEY);
        return (userTokenData !== null) ? JSON.parse(userTokenData) : null;
    }

    /**
     * Save the user token
     * @param userToken User token
     */
    saveUserToken(userToken: string): void {
        localStorage.removeItem(USER_TOKEN_KEY);
        localStorage.setItem(USER_TOKEN_KEY, userToken);
    }

    /**
     * Save the user token data
     * @param userTokenData [description]
     */
    saveUserTokenData(userTokenData: UserTokenData): void {
        localStorage.removeItem(USER_DATA_KEY);
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(userTokenData));
    }

}
