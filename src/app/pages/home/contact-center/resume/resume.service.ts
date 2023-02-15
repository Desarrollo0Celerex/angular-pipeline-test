import { Injectable } from '@angular/core';

import { WORKSPACE_DIRECTORY_TYPES } from '@constants/global';
import { WorkspaceDirectory } from '@interfaces/workspace-directory.interface';
import { WorkspaceDirectoryService } from '@services/workspace-directory.service';

@Injectable()
export class ResumeService {
    isCompletedAdvisory: boolean | null = null;
    isCompletedPayments: boolean | null = null;
    isCompletedSinisters: boolean | null = null;
    isCompletedSupport: boolean | null = null;
    isContentLoaded: boolean = false;

    constructor(private _workspaceDirectoryService: WorkspaceDirectoryService) { }

    loadWorkspaceDirectories(): void {
        const fields: string = 'workspaceDirectoryTypeId';
        this._workspaceDirectoryService.getWorkspaceDirectories(fields).subscribe((workspaceDirectories: WorkspaceDirectory[]) => {
            const directoryAdvisory: WorkspaceDirectory | undefined = workspaceDirectories.find((element: WorkspaceDirectory) => element.workspaceDirectoryTypeId === WORKSPACE_DIRECTORY_TYPES.ADVISORY);
            const directoryPayments: WorkspaceDirectory | undefined = workspaceDirectories.find((element: WorkspaceDirectory) => element.workspaceDirectoryTypeId === WORKSPACE_DIRECTORY_TYPES.PAYMENTS);
            const directorySinisters: WorkspaceDirectory | undefined = workspaceDirectories.find((element: WorkspaceDirectory) => element.workspaceDirectoryTypeId === WORKSPACE_DIRECTORY_TYPES.SINISTERS);
            const directorySupport: WorkspaceDirectory | undefined = workspaceDirectories.find((element: WorkspaceDirectory) => element.workspaceDirectoryTypeId === WORKSPACE_DIRECTORY_TYPES.SUPPORT);
            
            this.isCompletedAdvisory = (typeof directoryAdvisory !== 'undefined') ? true : false;
            this.isCompletedPayments = (typeof directoryPayments !== 'undefined') ? true : false;
            this.isCompletedSinisters = (typeof directorySinisters !== 'undefined') ? true : false;
            this.isCompletedSupport = (typeof directorySupport !== 'undefined') ? true : false;

            this.isContentLoaded = true;
        });
    }
}
