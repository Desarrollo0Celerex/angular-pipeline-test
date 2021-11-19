import { Component } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';

import * as moment from 'moment';

@Component({
  selector: 'agt-last-policies-to-renew',
  templateUrl: './last-policies-to-renew.page.html',
  styles: [
  ]
})
export class LastPoliciesToRenewPage {
    CONTENT_TYPES: any = CONTENT_TYPES;
    pageUrl: string = '/' + ROUTES_NAME.listClients;
    rangeField: string = 'validityEndDate';
    rangeStart: string = moment().subtract(60, 'days').format('DD/MM/YYYY');
    rangeEnd: string = moment().add(30, 'days').format('DD/MM/YYYY');
}
