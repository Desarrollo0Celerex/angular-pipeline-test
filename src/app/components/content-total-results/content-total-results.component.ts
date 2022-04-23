import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';

import { ContentTotalResultsService } from './content-total-results.service';

@Component({
  selector: 'agt-content-total-results',
  templateUrl: './content-total-results.component.html',
  styles: [
  ]
})
export class ContentTotalResultsComponent implements OnChanges {
    @Input() contactId: string;
    @Input() contentType: number;
    @Input() policyId: string;
    @Input() query: string;
    @Input() totalResults: number;
    @Input() contentTypeName: string = '';
    @Input() contentSubtypeName: string = '';
    CONTENT_TYPES: any = CONTENT_TYPES;
    policyNumber: string;

    constructor(public contentTotalResultsService: ContentTotalResultsService) {
        this.contactId = '';
        this.contentType = 0;
        this.policyId = '';
        this.query = '';
        this.totalResults = 0;
        this.policyNumber = '';
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(
            (typeof changes.contactId !== 'undefined' && !!changes.contactId.currentValue) &&
            (typeof changes.policyId !== 'undefined' && !!changes.policyId.currentValue)
        ) {
            this.contentTotalResultsService.loadPolicyNumber(this.contactId, this.policyId);
        }
    }

}
