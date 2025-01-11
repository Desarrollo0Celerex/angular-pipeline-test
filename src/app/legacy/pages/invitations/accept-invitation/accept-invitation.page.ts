import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { INVITATION_STATUS } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { environment } from '@env/environment';
import { AlertHelper } from '@core/helpers/alert.helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { UserTokenData } from '@core/interfaces/user-token-data.interface';
import { LoadingService } from '@core/services/loading/loading.service';

import { AcceptInvitationService } from './accept-invitation.service';

@Component({
    selector: 'agt-accept-invitation',
    templateUrl: './accept-invitation.page.html',
    styles: [],
    standalone: false
})
export class AcceptInvitationPage implements OnInit {
    invitationToken: string;
    INVITATION_STATUS: any = INVITATION_STATUS;

    constructor(
        public acceptInvitationService: AcceptInvitationService,
        private _loadingService: LoadingService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) {
        this.invitationToken = '';
    }

    ngOnInit(): void {
        this._catchParams();
        this._loadInvitation();
    }

    /**
     * Click event to exit of the app
     */
    onClickExit(): void {
        window.location.href = environment.agenthos.landingUrl;
    }

    /**
     * Click event to reject an invitation
     */
    onClickRejectInvitation(): void {
        this._loadingService.show();
        this.acceptInvitationService
            .rejectInvitation(this.invitationToken)
            .subscribe(() => {
                this._loadingService.hide();
                AlertHelper.invitationRejected();
            });
    }

    /**
     * Click event to accept an invitation
     */
    onClickAcceptInvitation(): void {
        this._loadingService.show();
        this.acceptInvitationService
            .acceptInvitation(this.invitationToken)
            .subscribe((res: HttpResponse) => {
                const userTokenData: UserTokenData =
                    this.acceptInvitationService.startSessionInAgenthos(
                        res.data
                    );
                // If the user has active workspace then login to firebase
                if (this.acceptInvitationService.checkHasActiveWorkspace()) {
                    this.acceptInvitationService
                        .getFirebaseToken(
                            userTokenData.workspaceId,
                            userTokenData.userId
                        )
                        .subscribe((res: string) => {
                            this.acceptInvitationService
                                .startSessionInFirebase(res)
                                .then(() => {
                                    this._loadingService.hide();
                                    this._router.navigateByUrl(
                                        ROUTES_NAME.dashboard
                                    );
                                })
                                .catch(() => {
                                    this._loadingService.hide();
                                    this.acceptInvitationService.logout();
                                });
                        });
                }
            });
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.invitationToken =
            this._activatedRoute.snapshot.params.invitationToken;
    }

    /**
     * Load the invitation data
     */
    private _loadInvitation(): void {
        this._loadingService.show();
        this.acceptInvitationService
            .loadInvitation(this.invitationToken)
            .subscribe(() => {
                this._loadingService.hide();
                if (this.acceptInvitationService.checkComesActiveWorkspace()) {
                    if (
                        this.acceptInvitationService.checkIsInvitationAccepted()
                    ) {
                        this._router.navigateByUrl(ROUTES_NAME.dashboard);
                    }
                } else {
                    this._router.navigateByUrl(
                        ROUTES_NAME.workspaceNotActivated
                    );
                }
            });
    }
}
