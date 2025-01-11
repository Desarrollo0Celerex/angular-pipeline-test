import { Component, OnInit } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@core/helpers/alert.helper';
import { UserTokenData } from '@core/interfaces/user-token-data.interface';
import { LoadingService } from '@core/services/loading/loading.service';

import { ActivateWorkspaceService } from './activate-workspace.service';
import { Router } from '@angular/router';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-activate-workspace',
    templateUrl: './activate-workspace.page.html',
    styles: [],
    standalone: false
})
export class ActivateWorkspacePage implements OnInit {
    modalIdCaptureActivationCode: string = 'agt-modal-capture-activation-code';

    constructor(
        public activateWorkspaceService: ActivateWorkspaceService,
        private _loadingService: LoadingService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        if (this.activateWorkspaceService.getActivationCode()) {
            this._activateWorkspace(
                this.activateWorkspaceService.getActivationCode()
            );
        } else {
            this.activateWorkspaceService.loadWorkspace();
        }
    }

    showModalToCaptureActivationCode(): void {
        ModalPlugin.show(this.modalIdCaptureActivationCode);
    }

    /**
     * Click event to start treal period
     */
    onClickStartTreal(): void {
        this._activateWorkspace(null);
    }

    private _activateWorkspace(activationCode: string | null): void {
        this._loadingService.show();
        this.activateWorkspaceService
            .activateWorkspace(activationCode)
            .subscribe((res: string) => {
                const userTokenData: UserTokenData =
                    this.activateWorkspaceService.startSessionInAgenthos(res);
                // Login to firebase
                this.activateWorkspaceService
                    .getFirebaseToken(
                        userTokenData.workspaceId,
                        userTokenData.userId
                    )
                    .subscribe((res: string) => {
                        this.activateWorkspaceService
                            .startSessionInFirebase(res)
                            .then(() => {
                                this._loadingService.hide();
                                if (activationCode) {
                                    AlertHelper.workspaceActivated(
                                        this._goToWelcome,
                                        this
                                    );
                                } else {
                                    AlertHelper.trialStarted(
                                        this._goToWelcome,
                                        this
                                    );
                                }
                            })
                            .catch(() => {
                                this._loadingService.hide();
                                this.activateWorkspaceService.logout();
                            });
                    });
            });
    }

    /**
     * Navigates to send invitatios
     * @param context App context
     */
    private _goToWelcome(context: any): void {
        context._router.navigateByUrl(ROUTES_NAME.workspaceWelcome);
    }
}
