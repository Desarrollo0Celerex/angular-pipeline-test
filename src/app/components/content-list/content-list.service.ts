import { Injectable } from '@angular/core';

import { HttpResponse } from '@interfaces/http-response.interface';
import { LeadService } from '@services/lead.service';

@Injectable()
export class ContentListService {
    contents: any[];

    constructor(private _leadService: LeadService) {
        this.contents = [];
    }

    /**
     * Load the leads
     * @param contentSubtype The filter to apply
     */
    loadLeads(contentSubtype: number): void {
        const fields: string = 'contactId,contactName,avatarUrl,leadStatusName,leadStatusBackground,contactSourceName,contactScoreName';
        this._leadService.getLeads(0, fields).subscribe( (res: HttpResponse) => {
            this.contents = res.data.data;
        })
    }

}
