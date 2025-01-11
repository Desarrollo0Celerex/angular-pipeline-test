import { Component, OnInit } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';

@Component({
    selector: 'agt-list-sinisters',
    template: '<agt-contents [contentType]="CONTENT_TYPES.SINISTER.ID" [contentTypeName]="CONTENT_TYPES.SINISTER.NAME"></agt-contents>',
    styles: [],
    standalone: false
})
export class ListSinistersPage implements OnInit {
    CONTENT_TYPES: any = CONTENT_TYPES;

    constructor() { }

    ngOnInit(): void {
    }

}
