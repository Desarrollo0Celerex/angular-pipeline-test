import { Component } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';

@Component({
  selector: 'agt-list-contacts',
  templateUrl: './list-contacts.page.html',
  styles: [
  ]
})
export class ListContactsPage {
    CONTENT_TYPES: any = CONTENT_TYPES;
}
