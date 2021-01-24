import { Injectable } from '@angular/core';

import { HttpResponse } from '@interfaces/http-response.interface';
import { User } from '@interfaces/user.interface';
import { UserService } from '@services/user.service';

@Injectable()
export class WelcomeService {
    user: User | {};

    constructor(private _userService: UserService) {
        this.user = {};
    }

    uploadUser(userId: string): void {
        this._userService.getUser(userId).subscribe( (res: HttpResponse) => {
            this.user = res.data;
            console.log('this.user: ',this.user);
        })
    }
}
