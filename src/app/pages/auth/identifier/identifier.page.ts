import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { HttpResponse } from '@interfaces/http-response.interface';

import { IdentifierService } from './identifier.service';

@Component({
  selector: 'agt-identifier',
  template: '',
  styles: [
  ]
})
export class IdentifierPage implements OnInit {
    private _authToken: string;
    private _redirectUrl: string;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _identifierService: IdentifierService,
        private _router: Router
    ) {
        this._authToken = '';
        this._redirectUrl = '';
    }

    ngOnInit(): void {
        if(this._identifierService.checkIsLoggedIn()) {
            this._router.navigateByUrl(ROUTES_NAME.dashboard);
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
        this._redirectUrl = this._activatedRoute.snapshot.queryParams['redirectUrl'] || ROUTES_NAME.dashboard;
    }

    /**
     * Identifies the user
     */
    private _identifyUser(): void {
        this._identifierService.identifyUser(this._authToken).subscribe( (res: HttpResponse) => {
            const userToken: string = res.data;
            this._identifierService.startSessionInAgethos(userToken);
            if(this._identifierService.checkHasActiveWorkspace()) {
                // TODO: iniciar sesión en firebase
                console.log('El usuario tiene un espacio de trabajo activo y debe iniciar sesión en firebase')
            } else {
                this._router.navigateByUrl(this._redirectUrl);
            }
        })
    }

}
