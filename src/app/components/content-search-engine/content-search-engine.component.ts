import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';

import { ContentSearchEngineService } from './content-search-engine.service';

@Component({
  selector: 'agt-content-search-engine',
  templateUrl: './content-search-engine.component.html',
  styles: [
  ]
})
export class ContentSearchEngineComponent implements OnChanges {
    @Input() contentType: number;
    @Input() contentTypeName: string;
    @Input() query: string;
    @Input() totalResults: number;

    constructor(
        public contentSearchEngineService: ContentSearchEngineService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) {
        this.contentType = 0;
        this.contentTypeName = '';
        this.query = '';
        this.totalResults = 0;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.query !== 'undefined') {
            this.contentSearchEngineService.buildSearchForm(this.query);
        }
    }

    /**
     * Submit event to search content
     */
    onSubmitSearchContent(): void {
        const query: string = this.contentSearchEngineService.f.query.value.trim();
        if(this.contentSearchEngineService.searchForm.valid && !!query) {
            switch(this.contentType) {
                case CONTENT_TYPES.LEAD.ID:
                    this._router.navigate([ROUTES_NAME.leadSearchResults], { queryParams: { query }});
                    break;

                case CONTENT_TYPES.CONTACT_QUOTATION.ID:
                    const contactId: string = this._getContactId();
                    this._router.navigate([ROUTES_NAME.listContactQuotations(contactId)], { queryParams: { query }});
                    break;
            }
        }
    }

    /**
     * Get the contact ID from params
     */
    private _getContactId(): string {
        const contactId: string | undefined = this._activatedRoute.snapshot.params.contactId;
        return (!!contactId) ? contactId : '';
    }

}
