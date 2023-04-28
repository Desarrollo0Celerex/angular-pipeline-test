import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
            this._router.navigateByUrl(ROUTES_NAME.dashboard);
        } else {
            this._loginService.goToAtomAccount();
        }
    }

}
