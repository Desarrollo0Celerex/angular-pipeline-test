import { Injectable } from '@angular/core';

import { HttpResponse } from '@interfaces/http-response.interface';
import { Workspace } from '@interfaces/workspace.interface';
import { WorkspaceService } from '@services/workspace.service';

@Injectable()
export class SidebarService {
    workspace: Workspace | null = null;

    constructor(private _workspaceService: WorkspaceService) { }

    loadWorkspace(): void {
        this._workspaceService.getWorkspace().subscribe((res: HttpResponse) => {
            this.workspace = res.data;
        })
    }
}
