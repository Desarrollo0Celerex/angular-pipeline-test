import { Injectable } from '@angular/core';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { User } from '@core/interfaces/user.interface';
import { AuthService } from '@features/auth/services/auth.service';
import { UserService } from '@services/user.service';

@Injectable()
export class WelcomeService {
    user: User | null;

    constructor(
        private _authService: AuthService,
        private _userService: UserService
    ) {
        this.user = null;
    }

    /**
     * Load the user
     */
    loadUser(): void {
        const userId: string | null = this._authService.userId;
        if (userId !== null) {
            const fields: string = 'avatarUrl,shortName';
            this._userService
                .getUser(userId, fields)
                .subscribe((res: HttpResponse) => {
                    this.user = res.data;
                });
        }
    }
}
