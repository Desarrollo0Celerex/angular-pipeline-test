import { Component } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';

@Component({
  selector: 'agt-list-leads',
  template: '<agt-contents [contentType]="CONTENT_TYPES.LEAD"></agt-contents>',
  styles: [
  ]
})
export class ListLeadsPage {
    CONTENT_TYPES: any = CONTENT_TYPES;
}
