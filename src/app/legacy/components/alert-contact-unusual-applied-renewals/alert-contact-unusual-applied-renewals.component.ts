import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { AlertContactUnusualAppliedRenewalsService } from './alert-contact-unusual-applied-renewals.service';

@Component({
    selector: 'agt-alert-contact-unusual-applied-renewals',
    templateUrl: './alert-contact-unusual-applied-renewals.component.html',
    styles: [],
    providers: [AlertContactUnusualAppliedRenewalsService],
    standalone: false
})
export class AlertContactUnusualAppliedRenewalsComponent implements OnChanges {
    @Input() contactId: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';

    constructor(public model: AlertContactUnusualAppliedRenewalsService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contactId && !!changes.contactId.currentValue) {
            this.model.loadAppliedRenewalsRate(changes.contactId.currentValue, this.rangeStart, this.rangeEnd);
        }
    }
}
