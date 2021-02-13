import { Component } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';

@Component({
  selector: 'agt-lead-search-results',
  template: '<agt-search-results [contentType]="CONTENT_TYPES.LEAD.ID" [contentTypeName]="CONTENT_TYPES.LEAD.NAME"></agt-search-results>',
  styles: [
  ]
})
export class LeadSearchResultsPage {
    CONTENT_TYPES: any;

    constructor() {
        this.CONTENT_TYPES = CONTENT_TYPES;
    }

}
