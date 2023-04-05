import { Injectable } from '@angular/core';

import { Site } from '@interfaces/site.interface';
import { SiteService } from '@services/site.service';
import { StoreService } from '@services/store.service';

@Injectable()
export class SiteCreatorService {
    siteCreatorIsCompleted: boolean | null = null;

    constructor(
        private _siteService: SiteService,
        private _storeService: StoreService,
    ) { 
        this._storeService.isCompletedSiteCreator.subscribe((status: boolean) => {
            this.siteCreatorIsCompleted = status;
        })
    }

    loadSiteCreatorStatus(): void {
        const fields: string = 'name,logoUrl,siteThemeId';
        this._siteService.getSite(fields).subscribe((res: Site) => {
            this.siteCreatorIsCompleted = (res.name !== null && res.logoUrl !== null && res.siteThemeId !== null) ? true : false;
        },
        () => {
            this.siteCreatorIsCompleted = false;
        });
    }
}
