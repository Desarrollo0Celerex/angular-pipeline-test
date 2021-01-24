import { Injectable } from '@angular/core';

import { AuthService } from '@services/auth.service';

@Injectable()
export class CheckWorkspaceStatusService {

    constructor(private _authService: AuthService) { }

    checkHasWorkspace(): boolean {
        return this._authService.checkHasWorkspace();
    }
}
