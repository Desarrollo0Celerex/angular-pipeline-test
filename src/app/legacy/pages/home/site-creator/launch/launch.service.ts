import { Injectable } from '@angular/core';

import { Site } from '@interfaces/site.interface';
import { SiteService } from '@services/site.service';

@Injectable()
export class LaunchService {
    site: Site | null = null;

    constructor(private _siteService: SiteService) { }

    loadSite(): void {
        const fields: string = 'domain,siteThemeName';
        this._siteService.getSite(fields).subscribe((res: Site) => { 
            this.site = res; 
        });
    }
}
