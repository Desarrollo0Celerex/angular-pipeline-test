import { Component } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';

import * as moment from 'moment';

@Component({
  selector: 'agt-last-cancelled-policies',
  templateUrl: './last-cancelled-policies.page.html',
  styles: [
  ]
})
export class LastCancelledPoliciesPage {
    CONTENT_TYPES: any = CONTENT_TYPES;
    pageUrl: string = '/' + ROUTES_NAME.listClients;
    rangeField: string = 'updatedAt';
    rangeStart: string = moment().subtract(90, 'days').format('DD/MM/YYYY');
    rangeEnd: string = moment().format('DD/MM/YYYY');
}
