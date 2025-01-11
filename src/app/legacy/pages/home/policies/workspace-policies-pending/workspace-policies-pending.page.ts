import { Component } from '@angular/core';

import { CONTENT_TYPES, DEFAULT_CONTENT_FILTER_ID } from '@constants/global';

@Component({
    selector: 'agt-workspace-policies-pending',
    templateUrl: './workspace-policies-pending.page.html',
    styles: [],
    standalone: false
})
export class WorkspacePoliciesPendingPage {
    CONTENT_TYPES: any = CONTENT_TYPES;
    DEFAULT_CONTENT_FILTER_ID: any = DEFAULT_CONTENT_FILTER_ID;
    specialFilter: string = '';

    applySpecialFilter(specialFilter: string): void {
        this.specialFilter = specialFilter;
    }

}
