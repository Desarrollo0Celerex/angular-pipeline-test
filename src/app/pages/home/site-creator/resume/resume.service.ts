import { Injectable } from '@angular/core';

import { Site } from '@interfaces/site.interface';
import { SiteService } from '@services/site.service';
import { StoreService } from '@services/store.service';

@Injectable()
export class ResumeService {
    isContentLoaded: boolean = false;
    isCompletedIdentity: boolean = false;
    isCompletedLogo: boolean = false;
    isCompletedTheme: boolean = false;
    site: Site | null = null;
    
    constructor(
        private _siteService: SiteService,
        private _storeService: StoreService,
    ) { }

    loadSite(): void {
        const fields: string = 'name,logoUrl,siteThemeId,siteThemeName,siteKey,createdAt,updatedAt';
        this._siteService.getSite(fields).subscribe((res: Site) => {
            this.isCompletedIdentity = (res.name !== null) ? true : false;
            this.isCompletedLogo = (res.logoUrl !== null) ? true : false;
            this.isCompletedTheme = (res.siteThemeId !== null) ? true : false;
            this.site = res;
            this.isContentLoaded = true;
            if(this.isCompletedIdentity === true && this.isCompletedLogo === true && this.isCompletedTheme === true) {
                this._storeService.setSiteCreatorCompleted();
            }
        },
        () => {
            this.isContentLoaded = true;
        });
    }
}
