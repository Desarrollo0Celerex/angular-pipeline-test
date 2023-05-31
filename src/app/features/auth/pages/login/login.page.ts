import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES_NAME } from '@constants/routes-name';

import { AuthService } from '@features/auth/services/auth.service';

@Component({
    selector: 'agt-login',
    template: '',
    styles: [],
})
export class LoginPage implements OnInit {
    constructor(private _authService: AuthService, private _router: Router) {}

    ngOnInit(): void {
        if (this._authService.checkIsLoggedIn()) {
            this._goToDashboard();
        } else {
            this._authService.goToAtomAccount();
        }
    }

    private _goToDashboard(): void {
        this._router.navigateByUrl(ROUTES_NAME.dashboard);
    }
}
