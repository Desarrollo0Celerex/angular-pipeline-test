import { Injectable } from '@angular/core';

import { WORKSPACE_DIRECTORY_TYPES } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';

import { ERROR_CODES } from '@constants/error-codes';
import { HttpError } from '@interfaces/http-error.interface';
import { Site } from '@interfaces/site.interface';
import { Wallet } from '@interfaces/wallet.interface';
import { SiteService } from '@services/site.service';
import { WalletService } from '@services/wallet.service';
import { WorkspaceDirectoryService } from '@services/workspace-directory.service';

@Injectable()
export class WelcomeService {
    contactCenterIsCompleted: boolean | null = null;
    appCreatorIsCompleted: boolean | null = null;
    siteCreatorIsCompleted: boolean | null = null;

    constructor(
        private _siteService: SiteService,
        private _walletService: WalletService,
        private _workspaceDirectoryService: WorkspaceDirectoryService,
    ) { }

    loadAppCreatorStatus(): void {
        const fields: string = 'name,iconsUrl,themeId';
        this._walletService.getWallet(fields).subscribe((res: Wallet) => {
            this.appCreatorIsCompleted = (res.name !== null && res.iconsUrl !== null && res.themeId !== null) ? true : false;
        });
    }

    loadContactCenterStatus(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('workspaceDirectoryTypeId', [WORKSPACE_DIRECTORY_TYPES.ADVISORY, WORKSPACE_DIRECTORY_TYPES.PAYMENTS, WORKSPACE_DIRECTORY_TYPES.SINISTERS, WORKSPACE_DIRECTORY_TYPES.SUPPORT]);
        this._workspaceDirectoryService.checkWorkspaceDirectoriesIsCompleted(filters).subscribe((isCompleted: boolean) => {
            this.contactCenterIsCompleted = isCompleted;
        });
    }

    loadSiteCreatorStatus(): void {
        const fields: string = 'name,logoUrl,siteThemeId';
        this._siteService.getSite(fields).subscribe((res: Site) => {
            this.siteCreatorIsCompleted = (res.name !== null && res.logoUrl !== null && res.siteThemeId !== null) ? true : false;
        },
        (error: HttpError) => {
            switch (error.error) {
                case ERROR_CODES.siteNotFound:
                    this.siteCreatorIsCompleted = false;
                    break;
            }
        });
    }
}
