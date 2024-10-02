import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES_NAME } from '@constants/routes-name';
import { UserTokenData } from '@core/interfaces/user-token-data.interface';

import { AuthService } from '@features-legacy/auth/services/auth.service';
import { FirebaseService } from '@core/services/firebase/firebase.service';
import { LoadingService } from '@core/services/loading/loading.service';

@Component({
    selector: 'agt-identify-user',
    template: '',
    styles: [],
})
export class IdentifyUserPage {
    private _authToken: string;
    private _redirectUrl: string;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _firebaseService: FirebaseService,
        private _loadingService: LoadingService,
        private _router: Router
    ) {
        this._authToken = '';
        this._redirectUrl = '';
    }

    ngOnInit(): void {
        if (this._authService.checkIsLoggedIn()) {
            this._router.navigateByUrl(ROUTES_NAME.workspaceWelcome);
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
        this._redirectUrl =
            this._activatedRoute.snapshot.queryParams['redirectUrl'] ||
            ROUTES_NAME.workspaceWelcome;
        this._authService.activationCode =
            this._activatedRoute.snapshot.queryParams['activationCode'] || '';
    }

    /**
     * Identifies the user
     */
    private _identifyUser(): void {
        this._loadingService.show();
        this._authService
            .identifyUser(this._authToken)
            .subscribe((res: string) => {
                const userTokenData: UserTokenData =
                    this._authService.startSessionInAgenthos(res);
                // If the user has active workspace
                if (this._authService.checkHasActiveWorkspace()) {
                    // If the user is active user, then login to firebase
                    if (this._authService.checkIsActiveUser()) {
                        this._authService
                            .getFirebaseToken(
                                userTokenData.workspaceId,
                                userTokenData.userId
                            )
                            .subscribe((res: string) => {
                                this._firebaseService
                                    .startSessionInFirebase(res)
                                    .then(() => {
                                        this._loadingService.hide();
                                        this._router.navigateByUrl(
                                            this._redirectUrl
                                        );
                                    })
                                    .catch(() => {
                                        this._loadingService.hide();
                                        this._authService.logout();
                                    });
                            });
                    } else {
                        this._loadingService.hide();
                        this._authService.closeSessionInAgenthos();
                        this._router.navigateByUrl(ROUTES_NAME.inactiveUser);
                    }
                } else {
                    this._loadingService.hide();
                    this._router.navigateByUrl(this._redirectUrl);
                }
            });
    }
}
