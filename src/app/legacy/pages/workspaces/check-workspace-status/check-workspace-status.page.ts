import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WORKSPACE_STATUS } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { HttpResponse } from '@core/interfaces/http-response.interface';

import { CheckWorkspaceStatusService } from './check-workspace-status.service';

@Component({
    selector: 'agt-check-workspace-status',
    template: '',
    styles: [],
})
export class CheckWorkspaceStatusPage implements OnInit {
    constructor(
        private _checkWorkspaceStatusService: CheckWorkspaceStatusService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        if (this._checkWorkspaceStatusService.checkHasWorkspace()) {
            this._checkWorkspaceStatus();
        } else {
            this._router.navigateByUrl(ROUTES_NAME.welcome);
        }
    }

    /**
     * Check the workspace status
     */
    private _checkWorkspaceStatus(): void {
        this._checkWorkspaceStatusService
            .getWorkspaceStatusId()
            .subscribe((res: HttpResponse) => {
                const workspaceStatusId: number = res.data.workspaceStatusId;
                switch (workspaceStatusId) {
                    case WORKSPACE_STATUS.CREATED:
                        this._router.navigateByUrl(
                            ROUTES_NAME.activateWorkspace
                        );
                        break;
                    case WORKSPACE_STATUS.COMPLETED:
                        this._router.navigateByUrl(ROUTES_NAME.dashboard);
                        break;
                }
            });
    }
}
