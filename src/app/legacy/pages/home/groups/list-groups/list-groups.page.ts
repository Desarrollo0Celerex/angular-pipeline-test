import { Component } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';

@Component({
    selector: 'agt-list-groups',
    templateUrl: './list-groups.page.html',
    styles: [],
    standalone: false
})
export class ListGroupsPage {
    CONTENT_TYPES: any;

    constructor() {
        this.CONTENT_TYPES =  CONTENT_TYPES;
    }
}
