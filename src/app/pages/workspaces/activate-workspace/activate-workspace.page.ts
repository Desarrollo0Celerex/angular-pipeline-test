import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { UserTokenData } from '@interfaces/user-token-data.interface';
import { LoadingService } from '@services/loading.service';

import { ActivateWorkspaceService } from './activate-workspace.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-activate-workspace',
  templateUrl: './activate-workspace.page.html',
  styles: [
  ]
})
export class ActivateWorkspacePage implements OnInit {
    modalIdCaptureActivationCode: string = 'agt-modal-capture-activation-code';

    constructor(
        public activateWorkspaceService: ActivateWorkspaceService,
        private _loadingService: LoadingService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.activateWorkspaceService.loadWorkspace();
    }

    showModalToCaptureActivationCode(): void {
        ModalPlugin.show(this.modalIdCaptureActivationCode);
    }

    /**
     * Click event to start treal period
     */
    onClickStartTreal(): void {
        this._loadingService.show();
        this.activateWorkspaceService.activateWorkspace(null).subscribe(( res: HttpResponse) => {
            const userTokenData: UserTokenData = this.activateWorkspaceService.startSessionInAgenthos(res.data);
            // Login to firebase
            this.activateWorkspaceService.getFirebaseToken(userTokenData.workspaceId, userTokenData.userId).subscribe( (res: HttpResponse) => {
                this.activateWorkspaceService.startSessionInFirebase(res.data).then( () => {
                    this._loadingService.hide();
                    AlertHelper.trialStarted(this._goToSendInvitations, this);
                }).catch(() => {
                    this._loadingService.hide();
                    this.activateWorkspaceService.logout();
                })
            });
        })
    }

    /**
     * Navigates to send invitatios
     * @param context App context
     */
    private _goToSendInvitations(context: any): void {
        context._router.navigateByUrl(ROUTES_NAME.listInvitations);
    }

}
