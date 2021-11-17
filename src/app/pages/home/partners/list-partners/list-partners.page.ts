import { Component } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';

@Component({
  selector: 'agt-list-partners',
  template: '<agt-contents [contentType]="CONTENT_TYPES.PARTNER.ID" [contentTypeName]="CONTENT_TYPES.PARTNER.NAME"></agt-contents>',
  styles: [
  ]
})
export class ListPartnersPage {
    CONTENT_TYPES: any = CONTENT_TYPES;
}
