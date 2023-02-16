import { Injectable } from '@angular/core';

import { WorkspaceDirectoryService } from '@services/workspace-directory.service';

@Injectable()
export class WelcomeService {
    contactCenterIsCompleted: boolean | null = null;

    constructor(private _workspaceDirectoryService: WorkspaceDirectoryService) { }

    loadContactCenterStatus(): void {
        this._workspaceDirectoryService.checkWorkspaceDirectoriesIsCompleted().subscribe((isCompleted: boolean) => {
            this.contactCenterIsCompleted = isCompleted;
        });
    }
}
