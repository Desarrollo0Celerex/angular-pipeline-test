import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ROUTES_NAME } from '@constants/routes-name';

@Component({
    selector: 'agt-modal-select-action-for-saved-policy',
    templateUrl: './modal-select-action-for-saved-policy.component.html',
    styles: [],
})
export class ModalSelectActionForSavedPolicyComponent implements OnChanges {
    @Input() contactId = '';
    @Input() paymentId = '';
    @Input() policyId = '';
    routeContactPolicies = '';
    routePolicyPendingReceipts = '';
    routePolicyRecord = '';
    modalId = 'agt-modal-select-action-for-saved-policy';

    ngOnChanges(): void {
        this._initRoutes();
    }

    showModalToSendPolicy(): void {
        console.log('Mostrar modal!');
    }

    private _initRoutes(): void {
        this.routeContactPolicies =
            '/' + ROUTES_NAME.listContactPolicies(this.contactId);
        this.routePolicyPendingReceipts =
            '/' +
            ROUTES_NAME.pendingReceipts(
                this.contactId,
                this.policyId,
                this.paymentId
            );

        this.routePolicyRecord =
            '/' + ROUTES_NAME.showHistoryPolicy(this.contactId, this.policyId);
    }
}
