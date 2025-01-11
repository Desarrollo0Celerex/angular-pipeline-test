import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { ModalShowPolicyDetailsService } from './modal-show-policy-details.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-show-policy-details',
    templateUrl: './modal-show-policy-details.component.html',
    styles: [],
    standalone: false
})
export class ModalShowPolicyDetailsComponent implements OnChanges {
    @Input() contactId: string = '';
    @Input() isHistoryContent: boolean = false;
    @Input() modalId: string = '';
    @Input() policyId: string = '';
    @Output() showPolicy: EventEmitter<string> = new EventEmitter<string>();

    constructor(
        public model: ModalShowPolicyDetailsService,
        private _router: Router
    ) { }

    get totalOpenSinisters(): number {
        return parseInt(this.model.policyDetails.totalOpenSinisters.toString());
    }

    get totalPendingReceipts(): number {
        return parseInt(this.model.policyDetails.totalBills.toString()) - parseInt(this.model.policyDetails.totalTickets.toString());
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(((!!changes.contactId && changes.contactId.currentValue) && (!!changes.policyId && !!changes.policyId.currentValue) ) || (!!this.contactId && (!!changes.policyId && !!changes.policyId.currentValue) )) {
            this.model.resetPolicyDetails();
            this.model.loadPolicyDetails(this.contactId, this.policyId);
        }
    }

    goToPendingReceipts(): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigateByUrl(ROUTES_NAME.pendingReceipts(this.contactId, this.policyId, this.model.policyDetails.paymentId));
    }

    goToPolicySinisters(): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigateByUrl(ROUTES_NAME.showPolicySinisters(this.contactId, this.policyId));
    }

    goToPolicyRecord(): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigateByUrl(ROUTES_NAME.showHistoryPolicy(this.contactId, this.policyId));
    }

}
