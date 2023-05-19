import { Component } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';

@Component({
  selector: 'agt-clients',
  templateUrl: './clients.page.html',
  styles: [
  ]
})
export class ClientsPage {
    CONTENT_TYPES: any = CONTENT_TYPES;
}
