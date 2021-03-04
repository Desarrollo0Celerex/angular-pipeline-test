import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

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
    @Input() contactId: string;
    @Input() contentType: number;
    @Input() contentTypeName: string;
    @Input() query: string;
    @Input() totalResults: number;

    constructor(
        public contentSearchEngineService: ContentSearchEngineService,
        private _router: Router
    ) {
        this.contactId = '';
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
                    this._router.navigate([ROUTES_NAME.listContactQuotations(this.contactId)], { queryParams: { query }});
                    break;

                case CONTENT_TYPES.CONTACT_POLICY.ID:
                    this._router.navigate([ROUTES_NAME.listContactPolicies(this.contactId)], { queryParams: { query }});
                    break;
            }
        }
    }

}
