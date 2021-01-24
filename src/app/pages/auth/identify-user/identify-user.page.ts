import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { HttpResponse } from '@interfaces/http-response.interface';

import { IdentifyUserService } from './identify-user.service';

@Component({
  selector: 'agt-identifyUser',
  template: '',
  styles: [
  ]
})
export class IdentifyUserPage implements OnInit {
    private _authToken: string;
    private _redirectUrl: string;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _identifyUserService: IdentifyUserService,
        private _router: Router
    ) {
        this._authToken = '';
        this._redirectUrl = '';
    }

    ngOnInit(): void {
        if(this._identifyUserService.checkIsLoggedIn()) {
            this._router.navigateByUrl(ROUTES_NAME.DASHBOARD);
        } else {
            this._catchParams();
            this._identifyUser();
        }
    }

    /**
     * Catch the parameters
     */
    private _catchParams(): void {
        this._authToken = this._activatedRoute.snapshot.params.authToken;
        this._redirectUrl = this._activatedRoute.snapshot.queryParams['redirectUrl'] || ROUTES_NAME.DASHBOARD;
    }

    /**
     * Identifies the user
     */
    private _identifyUser(): void {
        this._identifyUserService.identifyUser(this._authToken).subscribe( (res: HttpResponse) => {
            const userToken: string = res.data;
            this._identifyUserService.startSessionInAgethos(userToken);
            if(this._identifyUserService.checkHasActiveWorkspace()) {
                // TODO: iniciar sesión en firebase
                console.log('El usuario tiene un espacio de trabajo activo y debe iniciar sesión en firebase')
            } else {
                this._router.navigateByUrl(this._redirectUrl);
            }
        })
    }

}
