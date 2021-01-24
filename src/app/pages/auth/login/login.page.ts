import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '@env/environment';
import { ROUTES_NAME } from '@constants/routes-name';

import { LoginService } from './login.service';

@Component({
  selector: 'agt-login',
  template: '',
  styles: [
  ]
})
export class LoginPage implements OnInit {

    constructor(
        private _loginService: LoginService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        if(this._loginService.checkIsLoggedIn()) {
            this._router.navigateByUrl(ROUTES_NAME.DASHBOARD);
        } else {
            this._redirectToAtomAccountLogin();
        }
    }

    /**
     * Redirect to Atom Account login
     */
    private _redirectToAtomAccountLogin(): void {
        const atomAccountLoginUrl: string = `${environment.atomAccountUrl}/auth/identifier`;
        const returnUrl: string = `${environment.appAgenthosUrl}/auth/identify-user`;
        let loginUrl = `${atomAccountLoginUrl}?serviceName=Agenthos&returnUrl=${returnUrl}`;
        const redirectUrl: string | null = this._loginService.getRedirectUrl();
        if(redirectUrl !== null) {
            loginUrl += `&redirectUrl=${redirectUrl}`;
        }
        window.location.href = loginUrl;
    }

}
