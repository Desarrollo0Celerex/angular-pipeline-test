import { Component } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';

@Component({
    selector: 'agt-list-policies',
    template: '<agt-contents [contentType]="CONTENT_TYPES.POLICY.ID" [contentTypeName]="CONTENT_TYPES.POLICY.NAME"></agt-contents>',
    styles: [],
    standalone: false
})
export class ListPoliciesPage {
    CONTENT_TYPES: any;

    constructor() {
        this.CONTENT_TYPES = CONTENT_TYPES;
    }
}
