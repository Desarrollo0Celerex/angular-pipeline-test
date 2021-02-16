import { Component, OnInit } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';

@Component({
  selector: 'agt-list-quotations',
  template: '<agt-profile-contents [contentType]="CONTENT_TYPES.CONTACT_QUOTATION.ID" [contentTypeName]="CONTENT_TYPES.CONTACT_QUOTATION.NAME"></agt-profile-contents>',
  styles: [
  ]
})
export class ListQuotationsPage implements OnInit {
    CONTENT_TYPES: any;

    constructor() {
        this.CONTENT_TYPES = CONTENT_TYPES;
    }

    ngOnInit(): void {
    }

}
