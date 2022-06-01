import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { AlertContactUnusualAppliedPaymentsService } from './alert-contact-unusual-applied-payments.service';

@Component({
  selector: 'agt-alert-contact-unusual-applied-payments',
  templateUrl: './alert-contact-unusual-applied-payments.component.html',
  styles: [
  ],
  providers: [AlertContactUnusualAppliedPaymentsService]
})
export class AlertContactUnusualAppliedPaymentsComponent implements OnChanges {
    @Input() contactId: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';

    constructor(public model: AlertContactUnusualAppliedPaymentsService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contactId && !!changes.contactId.currentValue) {
            this.model.loadAppliedPaymentsRate(changes.contactId.currentValue, this.rangeStart, this.rangeEnd);
        }
    }
}
