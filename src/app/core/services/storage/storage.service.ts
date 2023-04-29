import { Injectable } from '@angular/core';

import { UserTokenData } from '@core/interfaces/user-token-data.interface';

const USER_TOKEN_KEY: string = 'user-token';
const USER_DATA_KEY: string = 'user-data';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    constructor() {}

    clearStorage(): void {
        localStorage.clear();
    }

    getUserToken(): string | null {
        return localStorage.getItem(USER_TOKEN_KEY);
    }

    getUserTokenData(): UserTokenData | null {
        const userTokenData: string | null =
            localStorage.getItem(USER_DATA_KEY);
        return userTokenData !== null ? JSON.parse(userTokenData) : null;
    }

    saveUserToken(userToken: string): void {
        localStorage.removeItem(USER_TOKEN_KEY);
        localStorage.setItem(USER_TOKEN_KEY, userToken);
    }

    saveUserTokenData(userTokenData: UserTokenData): void {
        localStorage.removeItem(USER_DATA_KEY);
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(userTokenData));
    }
}
