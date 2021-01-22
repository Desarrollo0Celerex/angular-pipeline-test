import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';

import { AuthLoginService } from './auth-login.service';

@Component({
  selector: 'agt-auth-login',
  template: '',
  styles: [
  ]
})
export class AuthLoginPage implements OnInit {

    constructor(private _authLoginService: AuthLoginService) { }

    ngOnInit(): void {
        if(this._authLoginService.checkIsLoggedIn()) {
            // TODO Redireccionar a la página más reciente
        } else {
            this._redirectToAtomAccountLogin();
        }
    }

    /**
     * Redirect to Atom Account login
     */
    private _redirectToAtomAccountLogin(): void {
        const atomAccountLoginUrl: string = environment.atomAccountUrl + '/auth/identifier';
        const returnUrl: string = environment.appAgenthosUrl + '/auth/identifier';
        let loginUrl = atomAccountLoginUrl + '?serviceName=Agenthos&returnUrl=' + returnUrl;
        const redirectUrl: string | null = this._authLoginService.getRedirectUrl();
        if(redirectUrl !== null) {
            loginUrl += '&redirectUrl=' + redirectUrl;
        }
        window.location.href = loginUrl;
    }

}
