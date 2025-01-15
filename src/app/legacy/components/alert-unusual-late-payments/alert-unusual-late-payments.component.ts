import { Component, Input, OnInit } from '@angular/core';

import { AlertUnusualLatePaymentsService } from './alert-unusual-late-payments.service';

@Component({
    selector: 'agt-alert-unusual-late-payments',
    templateUrl: './alert-unusual-late-payments.component.html',
    styles: [],
    providers: [AlertUnusualLatePaymentsService],
    standalone: false
})
export class AlertUnusualLatePaymentsComponent implements OnInit {
    @Input() contactId: string = '';
    @Input() policyId: string = '';

    constructor(public model: AlertUnusualLatePaymentsService) { }

    ngOnInit(): void {
        this.model.loadLatePayments(this.contactId, this.policyId);
    }
}
