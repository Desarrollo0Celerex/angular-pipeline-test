import { Component, OnInit } from '@angular/core';

import { Workspace } from '@core/interfaces/workspace.interface';
import { WorkspaceService } from '@core/services/workspace/workspace.service';

import { ROUTES_NAME } from '@constants/routes-name';
import { environment } from '@env/environment';

@Component({
    selector: 'agt-sidebar',
    templateUrl: './sidebar.component.html',
    styles: [],
})
export class SidebarComponent implements OnInit {
    ROUTES_NAME: any = ROUTES_NAME;
    agenthosSupportPhone =
        environment.agenthos.support.phoneCode +
        environment.agenthos.support.phoneNumber;
    workspace: Workspace | undefined = undefined;

    constructor(private _workspaceService: WorkspaceService) {}

    ngOnInit(): void {
        this._loadWorkspace();
    }

    private _loadWorkspace(): void {
        this._workspaceService
            .getWorkspace('avatarUrl,brandName')
            .subscribe((res: Workspace) => {
                this.workspace = res;
            });
    }
}
