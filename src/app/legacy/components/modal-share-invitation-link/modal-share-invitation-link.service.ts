import { Injectable } from '@angular/core';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { Workspace } from '@core/interfaces/workspace.interface';
import { WorkspaceService } from '@core/services/workspace/workspace.service';

@Injectable()
export class ModalShareInvitationLinkService {
    workspace: Workspace | null;

    constructor(private _workspaceService: WorkspaceService) {
        this.workspace = null;
    }

    /**
     * Load the workspace
     */
    loadWorkspace(): void {
        const fields: string = 'brandName';
        this._workspaceService
            .getWorkspace(fields)
            .subscribe((res: Workspace) => {
                this.workspace = res;
            });
    }
}
