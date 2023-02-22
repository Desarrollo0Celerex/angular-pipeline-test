import { Injectable } from '@angular/core';

import { WORKSPACE_DIRECTORY_TYPES } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';

import { WorkspaceDirectoryService } from '@services/workspace-directory.service';
import { WalletService } from '@services/wallet.service';
import { Wallet } from '@interfaces/wallet.interface';

@Injectable()
export class WelcomeService {
    contactCenterIsCompleted: boolean | null = null;
    appCreatorIsCompleted: boolean | null = null;

    constructor(
        private _walletService: WalletService,
        private _workspaceDirectoryService: WorkspaceDirectoryService,
    ) { }

    loadAppCreatorStatus(): void {
        const fields: string = 'name,themeId';
        this._walletService.getWallet(fields).subscribe((res: Wallet) => {
            this.appCreatorIsCompleted = (res.name !== null && res.themeId !== null) ? true : false;
        });
    }

    loadContactCenterStatus(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('workspaceDirectoryTypeId', [WORKSPACE_DIRECTORY_TYPES.ADVISORY, WORKSPACE_DIRECTORY_TYPES.PAYMENTS, WORKSPACE_DIRECTORY_TYPES.SINISTERS, WORKSPACE_DIRECTORY_TYPES.SUPPORT]);
        this._workspaceDirectoryService.checkWorkspaceDirectoriesIsCompleted(filters).subscribe((isCompleted: boolean) => {
            this.contactCenterIsCompleted = isCompleted;
        });
    }
}
