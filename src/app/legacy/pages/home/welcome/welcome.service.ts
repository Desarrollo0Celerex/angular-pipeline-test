import { Injectable } from '@angular/core';

import { WORKSPACE_DIRECTORY_TYPES } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { Site } from '@interfaces/site.interface';
import { Wallet } from '@interfaces/wallet.interface';
import { WorkspaceInsuranceService } from '@services/workspace-insurance.service';
import { SiteService } from '@services/site.service';
import { WalletService } from '@services/wallet.service';
import { AuthService } from '@core/services/auth/auth.service';
import { WorkspaceService } from '@services/workspace.service';
import { WorkspaceDirectoryService } from '@services/workspace-directory.service';
import { WorkspaceUserService } from '@services/workspace-user.service';

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
            .subscribe((res: HttpResponse) => {
                this.socialConnectIsCompleted =
                    res.data.cardiumUrl !== null &&
                    res.data.facebookUrl !== null &&
                    res.data.instagramUrl !== null &&
                    res.data.twitterUrl !== null &&
                    res.data.linkedinUrl !== null &&
                    res.data.tiktokUrl !== null
                        ? true
                        : false;
            });
    }

    loadUser(): void {
        const userId: string = this._authService.userId;
        const fields: string = 'shortName';
        this._workspaceUserService
            .getWorkspaceUser(userId, fields)
            .subscribe((res: HttpResponse) => {
                this.username = res.data.shortName;
            });
    }
}
