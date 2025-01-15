import { Component } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';

@Component({
    selector: 'agt-policies',
    templateUrl: './policies.page.html',
    styles: [],
    standalone: false
})
export class PoliciesPage {
    CONTENT_TYPES: any = CONTENT_TYPES;
}
