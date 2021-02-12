import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpResponse } from '@interfaces/http-response.interface';
import { LeadService } from '@services/lead.service';

@Injectable()
export class ContentListService {
    contents: any[];

    constructor(private _leadService: LeadService) {
        this.contents = this.buildContents();
    }

    /**
     * Initialize the contents
     */
    initContents(): void {
        this.contents = this.buildContents();
    }

    /**
     * Load the leads
     * @param contentSubtype The filter to apply
     */
    loadLeads(contentSubtype: number): Observable<void> {
        return new Observable( observer => {
            const fields: string = 'contactId,contactName,avatarUrl,leadStatusName,leadStatusBackground,contactSourceName,contactScoreName';
            this._leadService.getLeads(0, fields).subscribe( (res: HttpResponse) => {
                this.contents = res.data.data;
                observer.next();
                observer.complete();
            })
        })
    }

    /**
     * Build the contents
     * @return The contents
     */
    private buildContents(): [] {
        return [];
    }

}
