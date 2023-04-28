import { Injectable } from '@angular/core';

import { HttpResponse } from '@interfaces/http-response.interface';
import { Workspace } from '@interfaces/workspace.interface';
import { WorkspaceService } from '@services/workspace.service';

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
        this._workspaceService.getWorkspace(fields).subscribe( (res: HttpResponse) => {
            this.workspace = res.data;
        })
    }
}
