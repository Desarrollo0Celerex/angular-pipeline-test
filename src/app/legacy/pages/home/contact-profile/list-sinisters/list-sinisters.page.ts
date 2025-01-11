import { Component } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';

@Component({
    selector: 'agt-list-sinisters',
    template: '<agt-contents [contentType]="CONTENT_TYPES.CONTACT_SINISTER.ID" [contentTypeName]="CONTENT_TYPES.CONTACT_SINISTER.NAME"></agt-contents>',
    styles: [],
    standalone: false
})
export class ListSinistersPage {
    CONTENT_TYPES: any = CONTENT_TYPES;
}
