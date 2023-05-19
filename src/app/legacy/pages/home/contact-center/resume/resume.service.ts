import { Injectable } from '@angular/core';

import { WORKSPACE_DIRECTORY_TYPES } from '@constants/global';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { WorkspaceDirectoryService } from '@services/workspace-directory.service';

@Injectable()
export class ResumeService {
    isCompletedAdvisory: boolean | null = null;
    isCompletedPayments: boolean | null = null;
    isCompletedSinisters: boolean | null = null;
    isCompletedSupport: boolean | null = null;
    isContentLoaded: boolean = false;

    constructor(
        private _workspaceDirectoryService: WorkspaceDirectoryService
    ) {}

    loadWorkspaceDirectoryAdvisoryStatus(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'workspaceDirectoryTypeId',
            [WORKSPACE_DIRECTORY_TYPES.ADVISORY]
        );
        this._workspaceDirectoryService
            .checkWorkspaceDirectoriesIsCompleted(filters)
            .subscribe((isCompleted: boolean) => {
                this.isCompletedAdvisory = isCompleted;
            });
    }

    loadWorkspaceDirectoryPaymentsStatus(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'workspaceDirectoryTypeId',
            [WORKSPACE_DIRECTORY_TYPES.PAYMENTS]
        );
        this._workspaceDirectoryService
            .checkWorkspaceDirectoriesIsCompleted(filters)
            .subscribe((isCompleted: boolean) => {
                this.isCompletedPayments = isCompleted;
            });
    }

    loadWorkspaceDirectorySinistersStatus(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'workspaceDirectoryTypeId',
            [WORKSPACE_DIRECTORY_TYPES.SINISTERS]
        );
        this._workspaceDirectoryService
            .checkWorkspaceDirectoriesIsCompleted(filters)
            .subscribe((isCompleted: boolean) => {
                this.isCompletedSinisters = isCompleted;
            });
    }

    loadWorkspaceDirectorySupportStatus(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'workspaceDirectoryTypeId',
            [WORKSPACE_DIRECTORY_TYPES.SUPPORT]
        );
        this._workspaceDirectoryService
            .checkWorkspaceDirectoriesIsCompleted(filters)
            .subscribe((isCompleted: boolean) => {
                this.isCompletedSupport = isCompleted;
            });
    }
}
