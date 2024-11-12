import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES_NAME } from '@constants/routes-name';
import { UserTokenData } from '@core/interfaces/user-token-data.interface';
import { FirebaseService } from '@core/services/firebase/firebase.service';
import { LoadingService } from '@core/services/loading/loading.service';
import { AuthService } from '@features-legacy/auth/services/auth.service';

@Component({
    selector: 'agt-authenticate-user',
    template: '',
    styles: [],
})
export class AuthenticateUserPage {
    private _userToken = '';

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _firebaseService: FirebaseService,
        private _loadingService: LoadingService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this._catchParams();
        this._authenticateUser();
    }

    private _catchParams(): void {
        this._userToken = this._activatedRoute.snapshot.params.userToken;
    }

    private _authenticateUser(): void {
        this._loadingService.show();
        this._authService
            .authenticateUser(this._userToken)
            .subscribe((res: any) => {
                const userTokenData: UserTokenData =
                    this._authService.startSessionInAgenthos(res.data);
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
                                            ROUTES_NAME.workspaceWelcome
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
                    this._router.navigateByUrl(ROUTES_NAME.workspaceWelcome);
                }
            });
    }
}
