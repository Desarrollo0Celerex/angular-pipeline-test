import { Injectable } from '@angular/core';

import { Site } from '@interfaces/site.interface';
import { SiteService } from '@services/site.service';

@Injectable()
export class ResumeService {
    isContentLoaded: boolean = false;
    isCompletedIdentity: boolean = false;
    isCompletedLogo: boolean = false;
    isCompletedTheme: boolean = false;
    site: Site | null = null;
    
    constructor(private _siteService: SiteService) { }

    loadSite(): void {
        const fields: string = 'name,logoUrl,siteThemeId,siteKey,createdAt,updatedAt';
        this._siteService.getSite(fields).subscribe((res: Site) => {
          this.isCompletedIdentity = (res.name !== null) ? true : false;
          this.isCompletedLogo = (res.logoUrl !== null) ? true : false;
          this.isCompletedTheme = (res.siteThemeId !== null) ? true : false;
          this.site = res;
          this.isContentLoaded = true;
        },
        (error: any) => {
            this.isContentLoaded = true;
            console.log('error: ',error);
            
        });
    }


}
