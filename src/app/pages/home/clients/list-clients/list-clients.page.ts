import { Component } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';

@Component({
  selector: 'agt-list-clients',
  template: '<agt-contents [contentType]="CONTENT_TYPES.CLIENT.ID" [contentTypeName]="CONTENT_TYPES.CLIENT.NAME"></agt-contents>',
  styles: [
  ]
})
export class ListClientsPage {
    CONTENT_TYPES: any;

    constructor() {
        this.CONTENT_TYPES =  CONTENT_TYPES;
    }
}
