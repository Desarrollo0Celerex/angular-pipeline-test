import { Component, OnInit } from '@angular/core';

import { WorkspaceUser } from '@core/interfaces/workspace-user.interface';
import { Workspace } from '@core/interfaces/workspace.interface';
import { WorkspaceService } from '@core/services/workspace/workspace.service';
import { WorkspaceUserService } from '@core/services/workspace-user/workspace-user.service';

import { ROUTES_NAME } from '@constants/routes-name';

@Component({
    selector: 'agt-page-header',
    templateUrl: './page-header.component.html',
    styles: [],
})
export class PageHeaderComponent implements OnInit {
    ROUTES_NAME: any = ROUTES_NAME;
    workspace: Workspace | undefined = undefined;
    workspaceUser: WorkspaceUser | undefined = undefined;

    constructor(
        private _workspaceService: WorkspaceService,
        private _workspaceUserService: WorkspaceUserService
    ) {}

    ngOnInit(): void {
        this._loadWorkspace();
        this._loadWorkspaceUser();
    }

    private _loadWorkspace(): void {
        this._workspaceService
            .getWorkspace('workspaceId,brandName,avatarUrl')
            .subscribe((res: Workspace) => {
                this.workspace = res;
            });
    }

    private _loadWorkspaceUser(): void {
        this._workspaceUserService
            .getLoggedWorkspaceUser('shortName')
            .subscribe((res: WorkspaceUser) => {
                this.workspaceUser = res;
            });
    }
}
