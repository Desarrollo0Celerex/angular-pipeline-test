import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { HttpResponse } from '@interfaces/http-response.interface';
import { UserTokenData } from '@interfaces/user-token-data.interface';
import { LoadingService } from '@services/loading.service';

import { IdentifyUserService } from './identify-user.service';

@Component({
  selector: 'agt-identify-user',
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
        private _loadingService: LoadingService,
        private _router: Router
    ) {
        this._authToken = '';
        this._redirectUrl = '';
    }

    ngOnInit(): void {
        if(this._identifyUserService.checkIsLoggedIn()) {
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
        this._loadingService.show();
        this._identifyUserService.identifyUser(this._authToken).subscribe( (res: HttpResponse) => {
            const userTokenData: UserTokenData = this._identifyUserService.startSessionInAgenthos(res.data);
            // If the user has active workspace then login to firebase
            if(this._identifyUserService.checkHasActiveWorkspace()) {
                this._identifyUserService.getFirebaseToken(userTokenData.workspaceId, userTokenData.userId).subscribe( (res: HttpResponse) => {
                    this._identifyUserService.startSessionInFirebase(res.data).then( () => {
                        this._loadingService.hide();
                        this._router.navigateByUrl(this._redirectUrl);
                    }).catch(() => {
                        this._loadingService.hide();
                        this._identifyUserService.logout();
                    })
                });
            } else {
                this._loadingService.hide();
                this._router.navigateByUrl(this._redirectUrl);
            }
        })
    }

}
