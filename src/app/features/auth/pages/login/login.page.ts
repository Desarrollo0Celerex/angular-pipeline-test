import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES_NAME } from '@constants/routes-name';
import { SmartComponent } from '@core/classes/smart-component';

import { AuthService } from '@features/auth/services/auth.service';

@Component({
    selector: 'agt-login',
    template: '',
    styles: [],
})
export class LoginPage extends SmartComponent implements OnInit {
    activationCode = '';

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _router: Router
    ) {
        super();
    }

    ngOnInit(): void {
        if (this._authService.checkIsLoggedIn()) {
            this._goToDashboard();
        } else {
            this.catchParams();
            this._authService.goToAtomAccount(this.activationCode);
        }
    }

    private catchParams(): void {
        this._activatedRoute.queryParams
            .pipe(this.untilComponentDestroy())
            .subscribe((params) => {
                this.activationCode = params.activationCode || '';
            });
    }

    private _goToDashboard(): void {
        this._router.navigateByUrl(ROUTES_NAME.dashboard);
    }
}
