import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpResponse } from '@interfaces/http-response.interface';
import { ContentResultData } from '@interfaces/content-result-data.interface';
import { LeadService } from '@services/lead.service';

@Injectable()
export class ContentListService {
    contents: any[];
    contentResultData: ContentResultData;

    constructor(private _leadService: LeadService) {
        this.contents = this._initContents();
        this.contentResultData = this._initContentResultData();
    }

    /**
     * Reset the contents
     */
    resetData(): void {
        this.contents = this._initContents();
        this.contentResultData = this._initContentResultData();
    }

    /**
     * Load the leads
     * @param  page           The page number to get
     * @param  contentSubtype The filter to apply
     * @return                Notice of action done
     */
    loadLeads(page: number, contentSubtype: number): Observable<void> {
        const fields: string = 'contactId,contactName,avatarUrl,leadStatusName,leadStatusBackground,contactSourceName,contactScoreName';
        return new Observable( observer => {
            this._leadService.getLeads(page, fields, contentSubtype).subscribe( (res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
                observer.next();
                observer.complete();
            })
        })
    }

    /**
     * Search the leads
     * @param  page  The page number to get
     * @param  query The query to search
     * @return       Notice of action done
     */
    searchLeads(page: number, query: string): Observable<void> {
        const fields: string = 'contactId,contactName,avatarUrl,leadStatusName,leadStatusBackground,contactSourceName,contactScoreName';
        const search: string = 'contactName:'+query;
        return new Observable( observer => {
            this._leadService.getLeads(page, fields, 0, search).subscribe( (res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
                observer.next();
                observer.complete();
            })
        })
    }

    /**
     * Initialize the contents
     * @return The contents
     */
    private _initContents(): [] {
        return [];
    }

    /**
     * Initialize the content result data
     * @return The content result data
     */
    private _initContentResultData(): ContentResultData {
        return {
            loadedItems: 0,
            totalItems: 0
        }
    }

    /**
     * Load the content result data
     * @param totalItems   The total items
     */
    private _loadContentResultData(totalItems: number): void {
        this.contentResultData = {
            loadedItems: this.contents.length,
            totalItems
        }
    }

}
