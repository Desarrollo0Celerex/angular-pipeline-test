import { Component, OnInit } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';

@Component({
    selector: 'agt-list-files',
    template: '<agt-contents [contentType]="CONTENT_TYPES.CONTACT_FILE.ID" [contentTypeName]="CONTENT_TYPES.CONTACT_FILE.NAME"></agt-contents>',
    styles: [],
    standalone: false
})
export class ListFilesPage implements OnInit {
    CONTENT_TYPES: any = CONTENT_TYPES;

    constructor() { }

    ngOnInit(): void {
    }

}
