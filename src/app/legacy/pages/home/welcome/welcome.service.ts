import { Injectable } from '@angular/core';

import { WORKSPACE_DIRECTORY_TYPES } from '@constants/global';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { Site } from '@interfaces/site.interface';
import { Wallet } from '@interfaces/wallet.interface';
import { WorkspaceInsuranceService } from '@services/workspace-insurance.service';
import { SiteService } from '@services/site.service';
import { WalletService } from '@services/wallet.service';
import { AuthService } from '@features/auth/services/auth.service';
import { WorkspaceService } from '@core/services/workspace/workspace.service';
import { WorkspaceDirectoryService } from '@services/workspace-directory.service';
import { WorkspaceUserService } from '@core/services/workspace-user/workspace-user.service';
import { WorkspaceUser } from '@core/interfaces/workspace-user.interface';
import { Workspace } from '@core/interfaces/workspace.interface';

@Injectable()
export class WelcomeService {
    appCreatorIsCompleted: boolean | null = null;
    contactCenterIsCompleted: boolean | null = null;
    leadGeneratorIsCompleted: boolean | null = null;
    siteCreatorIsCompleted: boolean | null = null;
    socialConnectIsCompleted: boolean | null = null;
    username: string = '';

    constructor(
        private _authService: AuthService,
        private _workspaceInsuranceService: WorkspaceInsuranceService,
        private _siteService: SiteService,
        private _walletService: WalletService,
        private _workspaceService: WorkspaceService,
        private _workspaceDirectoryService: WorkspaceDirectoryService,
        private _workspaceUserService: WorkspaceUserService
    ) {}

    loadAppCreatorStatus(): void {
        const fields: string = 'name,iconsUrl,themeId';
        this._walletService.getWallet(fields).subscribe((res: Wallet) => {
            this.appCreatorIsCompleted =
                res.name !== null &&
                res.iconsUrl !== null &&
                res.themeId !== null
                    ? true
                    : false;
        });
    }

    loadContactCenterStatus(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'workspaceDirectoryTypeId',
            [
                WORKSPACE_DIRECTORY_TYPES.ADVISORY,
                WORKSPACE_DIRECTORY_TYPES.PAYMENTS,
                WORKSPACE_DIRECTORY_TYPES.SINISTERS,
                WORKSPACE_DIRECTORY_TYPES.SUPPORT,
            ]
        );
        this._workspaceDirectoryService
            .checkWorkspaceDirectoriesIsCompleted(filters)
            .subscribe((isCompleted: boolean) => {
                this.contactCenterIsCompleted = isCompleted;
            });
    }

    loadLeadGeneratorStatus(): void {
        this._workspaceInsuranceService
            .getTotalWorkspaceInsurances()
            .subscribe((total: number) => {
                this.leadGeneratorIsCompleted = total > 0 ? true : false;
            });
    }

    loadSiteCreatorStatus(): void {
        const fields: string = 'name,logoUrl,siteThemeId';
        this._siteService.getSite(fields).subscribe(
            (res: Site) => {
                this.siteCreatorIsCompleted =
                    res.name !== null &&
                    res.logoUrl !== null &&
                    res.siteThemeId !== null
                        ? true
                        : false;
            },
            () => {
                this.siteCreatorIsCompleted = false;
            }
        );
    }

    loadSocialConnectStatus(): void {
        const fields: string =
            'cardiumUrl,facebookUrl,instagramUrl,twitterUrl,linkedinUrl,tiktokUrl';
        this._workspaceService
            .getWorkspace(fields)
            .subscribe((res: Workspace) => {
                this.socialConnectIsCompleted =
                    res.cardiumUrl !== null &&
                    res.facebookUrl !== null &&
                    res.instagramUrl !== null &&
                    res.twitterUrl !== null &&
                    res.linkedinUrl !== null &&
                    res.tiktokUrl !== null
                        ? true
                        : false;
            });
    }

    loadUser(): void {
        const userId: string = this._authService.userId;
        const fields: string = 'shortName';
        this._workspaceUserService
            .getLoggedWorkspaceUser(fields)
            .subscribe((res: WorkspaceUser) => {
                this.username = res.shortName;
            });
    }
}
