import { Component, OnInit } from '@angular/core';
import { PolicyPaymentActionsModalService } from './policy-payment-actions-modal.service';
import { SmartComponent } from '@core/classes/smart-component';
import { PAYMENTS_ROUTES } from '@payment/constants/routes';
import { PolicyService } from '@policy/services/policy.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-policy-payment-actions-modal',
    templateUrl: './policy-payment-actions-modal.component.html',
    styles: [],
})
export class PolicyPaymentActionsModalComponent
    extends SmartComponent
    implements OnInit
{
    modalId = 'agt-policy-payment-actions-modal';
    totalLatePayments = 0;
    private _contactId = '';
    private _policyId = '';
    private _paymentId = '';

    constructor(
        private _policyService: PolicyService,
        private _policyPaymentActionsModalService: PolicyPaymentActionsModalService
    ) {
        super();
    }

    ngOnInit(): void {
        this._policyPaymentActionsModalService.policyPaymentActionsModal$
            .pipe(this.untilComponentDestroy())
            .subscribe((data) => {
                this._contactId = data.contactId;
                this._policyId = data.policyId;
                this._paymentId = data.paymentId;
                this._openModal();
                this._loadTotalLatePayments();
            });
    }

    get alertMessage(): string {
        return this.totalLatePayments === 1
            ? 'La póliza tiene <strong>1</strong> recibo atrasado.'
            : 'La póliza tiene <strong>' +
                  this.totalLatePayments +
                  '</strong> recibos atrasados.';
    }

    get alertType(): string {
        return this.totalLatePayments === 1 ? 'warning' : 'danger';
    }

    get pendingPaymentsRoute(): string {
        return (
            '/' +
            PAYMENTS_ROUTES.policyPendingPayments(
                this._contactId,
                this._policyId,
                this._paymentId
            )
        );
    }

    get appliedPaymentsRoute(): string {
        return (
            '/' +
            PAYMENTS_ROUTES.policyAppliedPayments(
                this._contactId,
                this._policyId,
                this._paymentId
            )
        );
    }

    private _openModal(): void {
        ModalPlugin.show(this.modalId);
    }

    private _loadTotalLatePayments(): void {
        this.totalLatePayments = 0;
        const fields = 'totalLatePayments';
        this._policyService
            .getContactPolicy(this._contactId, this._policyId, fields)
            .subscribe((policy) => {
                this.totalLatePayments = policy.totalLatePayments;
            });
    }
}
