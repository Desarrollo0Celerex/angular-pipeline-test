import { Injectable } from '@angular/core';

import { WORKSPACE_DIRECTORY_TYPES } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';

import { WorkspaceDirectoryService } from '@services/workspace-directory.service';

@Injectable()
export class WelcomeService {
    contactCenterIsCompleted: boolean | null = null;

    constructor(private _workspaceDirectoryService: WorkspaceDirectoryService) { }

    loadContactCenterStatus(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('workspaceDirectoryTypeId', [WORKSPACE_DIRECTORY_TYPES.ADVISORY, WORKSPACE_DIRECTORY_TYPES.PAYMENTS, WORKSPACE_DIRECTORY_TYPES.SINISTERS, WORKSPACE_DIRECTORY_TYPES.SUPPORT]);
        this._workspaceDirectoryService.checkWorkspaceDirectoriesIsCompleted(filters).subscribe((isCompleted: boolean) => {
            this.contactCenterIsCompleted = isCompleted;
        });
    }
}
