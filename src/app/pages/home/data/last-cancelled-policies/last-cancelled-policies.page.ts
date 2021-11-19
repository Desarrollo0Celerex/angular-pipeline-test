import { Component } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';

@Component({
  selector: 'agt-last-cancelled-policies',
  templateUrl: './last-cancelled-policies.page.html',
  styles: [
  ]
})
export class LastCancelledPoliciesPage {
    CONTENT_TYPES: any = CONTENT_TYPES;
    pageUrl: string = '/' + ROUTES_NAME.listClients;
}
