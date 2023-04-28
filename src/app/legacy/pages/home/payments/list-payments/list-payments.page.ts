import { Component } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';

@Component({
  selector: 'agt-list-payments',
  template: '<agt-contents [contentType]="CONTENT_TYPES.PAYMENT.ID" [contentTypeName]="CONTENT_TYPES.PAYMENT.NAME"></agt-contents>',
  styles: [
  ]
})
export class ListPaymentsPage {
    CONTENT_TYPES: any = CONTENT_TYPES;
}
