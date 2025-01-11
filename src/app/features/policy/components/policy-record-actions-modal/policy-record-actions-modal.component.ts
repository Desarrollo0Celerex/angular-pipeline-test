import { Component, OnInit } from '@angular/core';
import { PolicyRecordActionsModalService } from './policy-record-actions-modal.service';
import { SmartComponent } from '@core/classes/smart-component';
import { SINISTER_ROUTES } from '@sinister/constants/routes';
import { POLICY_ROUTES } from '@policy/constants/routes';
import { PAYMENT_ROUTES } from '@payment/constants/routes';
import { ENDORSEMENT_ROUTES } from '@endorsement/constants/routes';
import { RENEWAL_ROUTES } from '@renewal/constants/routes';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-policy-record-actions-modal',
    templateUrl: './policy-record-actions-modal.component.html',
    styles: [],
    standalone: false
})
export class PolicyRecordActionsModalComponent
    extends SmartComponent
    implements OnInit
{
    modalId = 'agt-policy-record-actions-modal';
    private _contactId = '';
    private _policyId = '';
    private _paymentId = '';

    constructor(
        private _policyRecordActionsModalService: PolicyRecordActionsModalService
    ) {
        super();
    }

    ngOnInit(): void {
        this._policyRecordActionsModalService.policyRecordActionsModal$
            .pipe(this.untilComponentDestroy())
            .subscribe((data) => {
                (this._contactId = data.contactId),
                    (this._policyId = data.policyId),
                    (this._paymentId = data.paymentId),
                    this._openModal();
            });
    }

    get endorsementsRecordRoute(): string {
        return (
            '/' +
            ENDORSEMENT_ROUTES.policyEndorsementsRecord(
                this._contactId,
                this._policyId
            )
        );
    }

    get paymentsRecordRoute(): string {
        return (
            '/' +
            PAYMENT_ROUTES.policyPaymentsRecord(
                this._contactId,
                this._policyId,
                this._paymentId
            )
        );
    }

    get policyRecordRoute(): string {
        return (
            '/' + POLICY_ROUTES.policyRecord(this._contactId, this._policyId)
        );
    }

    get renewalsRecordRoute(): string {
        return (
            '/' +
            RENEWAL_ROUTES.policyRenewalsRecord(this._contactId, this._policyId)
        );
    }

    get sinistersRecordRoute(): string {
        return (
            '/' +
            SINISTER_ROUTES.policySinistersRecord(
                this._contactId,
                this._policyId
            )
        );
    }

    private _openModal(): void {
        ModalPlugin.show(this.modalId);
    }
}
