import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { AlertGroupUnusualAppliedPaymentsService } from './alert-group-unusual-applied-payments.service';

@Component({
    selector: 'agt-alert-group-unusual-applied-payments',
    templateUrl: './alert-group-unusual-applied-payments.component.html',
    styles: [],
    providers: [AlertGroupUnusualAppliedPaymentsService],
    standalone: false
})
export class AlertGroupUnusualAppliedPaymentsComponent implements OnChanges {
    @Input() groupId: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';

    constructor(public model: AlertGroupUnusualAppliedPaymentsService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.groupId && !!changes.groupId.currentValue) {
            this.model.loadAppliedPaymentsRate(changes.groupId.currentValue, this.rangeStart, this.rangeEnd);
        }
    }
}
