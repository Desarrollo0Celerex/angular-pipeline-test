import { Component } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';

@Component({
  selector: 'agt-list-quotations',
  template: '<agt-contents [contentType]="CONTENT_TYPES.CONTACT_QUOTATION.ID" [contentTypeName]="CONTENT_TYPES.CONTACT_QUOTATION.NAME"></agt-contents>',
  styles: [
  ]
})
export class ListQuotationsPage {
    CONTENT_TYPES: any;

    constructor() {
        this.CONTENT_TYPES = CONTENT_TYPES;
    }
}
