import { Component } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';

@Component({
  selector: 'agt-list-policies',
  template: '<agt-contents [contentType]="CONTENT_TYPES.CONTACT_POLICY.ID" [contentTypeName]="CONTENT_TYPES.CONTACT_POLICY.NAME"></agt-contents>',
  styles: [
  ]
})
export class ListPoliciesPage {
    CONTENT_TYPES: any;

    constructor() {
        this.CONTENT_TYPES = CONTENT_TYPES;
    }
}
