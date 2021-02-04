import { Injectable } from '@angular/core';

import { HttpResponse } from '@interfaces/http-response.interface';
import { Workspace } from '@interfaces/workspace.interface';
import { WorkspaceService } from '@services/workspace.service';

@Injectable()
export class WorkspaceInfoService {
    workspace: Workspace | null;

    constructor(private _workspaceService: WorkspaceService) {
        this.workspace = null;
    }

    /**
     * Load the workspace data
     */
    loadWorkspace(): void {
        const fields: string = 'workspaceId,brandName,avatarUrl';
        this._workspaceService.getWorkspace(fields).subscribe( (res: HttpResponse) => {
            this.workspace = res.data;
        })
    }
}
