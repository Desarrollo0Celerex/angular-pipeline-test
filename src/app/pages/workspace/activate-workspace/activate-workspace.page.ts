import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
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
    activateWorkspaceModalId: string;

    constructor(
        public activateWorkspaceService: ActivateWorkspaceService,
        private _loadingService: LoadingService,
        private _router: Router
    ) {
        this.activateWorkspaceModalId = 'agt-modal-activate-workspace';
    }

    ngOnInit(): void {
        this.activateWorkspaceService.loadWorkspace();
    }

    /**
     * Click event to show the modal to activate workspace
     */
    onClickShowModalActivateWorkspace(): void {
        ModalPlugin.show(this.activateWorkspaceModalId);
    }

    /**
     * Click event to start treal period
     */
    onClickStartTreal(): void {
        this._loadingService.show();
        this.activateWorkspaceService.activateWorkspace(null).subscribe(( res: HttpResponse) => {
            this._loadingService.hide();
            this.activateWorkspaceService.startSessionInAgenthos(res.data);
            AlertHelper.trialStarted(this._goToSendInvitations, this);
        })
    }

    /**
     * Navigates to send invitatios
     * @param context App context
     */
    private _goToSendInvitations(context: any): void {
        context._router.navigateByUrl(ROUTES_NAME.sendInvitations);
    }

}
