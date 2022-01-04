import { Component } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';

@Component({
  selector: 'agt-list-incomplete-policies',
  templateUrl: './list-incomplete-policies.page.html',
  styles: [
  ]
})
export class ListIncompletePoliciesPage {
    CONTENT_TYPES: any = CONTENT_TYPES;
}
