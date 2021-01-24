import { Injectable } from '@angular/core';

import { HttpResponse } from '@interfaces/http-response.interface';
import { User } from '@interfaces/user.interface';
import { UserService } from '@services/user.service';

@Injectable()
export class WelcomeService {
    user: User | null;

    constructor(private _userService: UserService) {
        this.user = null;
    }

    uploadUser(userId: string): void {
        const fields: string = 'avatarUrl,shortName';
        this._userService.getUser(userId, fields).subscribe( (res: HttpResponse) => {
            this.user = res.data;
        })
    }
}
