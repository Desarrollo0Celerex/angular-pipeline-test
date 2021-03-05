import { Component } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';

@Component({
  selector: 'agt-client-search-results',
  template: '<agt-search-results [contentType]="CONTENT_TYPES.CLIENT.ID" [contentTypeName]="CONTENT_TYPES.CLIENT.NAME"></agt-search-results>',
  styles: [
  ]
})
export class ClientSearchResultsPage {
    CONTENT_TYPES: any;

    constructor() {
        this.CONTENT_TYPES = CONTENT_TYPES;
    }

}
