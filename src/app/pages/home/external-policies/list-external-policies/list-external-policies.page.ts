import { Component } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';

@Component({
  selector: 'agt-list-external-policies',
  templateUrl: './list-external-policies.page.html',
  styles: [
  ]
})
export class ListExternalPoliciesPage {
    CONTENT_TYPES: any = CONTENT_TYPES;
}
