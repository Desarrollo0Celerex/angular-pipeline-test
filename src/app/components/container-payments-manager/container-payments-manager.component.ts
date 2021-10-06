import { Component, Input, OnInit } from '@angular/core';

import { POLICY_STATUS } from '@constants/global';
import { AlertHelper } from '@helpers/alert.helper';
import { LoadingService } from '@services/loading.service';

import { ContainerPaymentsManagerService } from './container-payments-manager.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-container-payments-manager',
  templateUrl: './container-payments-manager.component.html',
  styles: [
  ],
  providers: [ContainerPaymentsManagerService]
})
export class ContainerPaymentsManagerComponent implements OnInit {
    @Input() paymentId: string = '';
    POLICY_STATUS: any = POLICY_STATUS;
    modalIdChangePaymentDate: string = 'agt-modal-change-payment-date';
    modalIdShowPolicyFile: string = 'agt-modal-show-policy-file';
    modalIdConfirmSuspendPayments: string = 'agt-modal-confirm-suspend-payments';
    modalIdConfirmActivatePayments: string = 'agt-modal-confirm-activate-payments';

    constructor(
        private _containerPaymentsManagerService: ContainerPaymentsManagerService,
        private _loadingService: LoadingService
    ) { }

    ngOnInit(): void {
        this.model.loadPayment(this.paymentId);
    }

    get model(): ContainerPaymentsManagerService {
        return this._containerPaymentsManagerService;
    }

    confirmSuspendPayments(): void {
        ModalPlugin.show(this.modalIdConfirmSuspendPayments);
    }

    confirmActivatePayments(): void {
        ModalPlugin.show(this.modalIdConfirmActivatePayments);
    }

    showModalToChangePaymentDate(): void {
        if(!!this.model.payment) {
            ModalPlugin.show(this.modalIdChangePaymentDate);
        }
    }

    showPolicy(): void {
        if(!!this.model.payment) {
            ModalPlugin.show(this.modalIdShowPolicyFile);
        }
    }

    suspendPayments(): void {
        if(!!this.model.payment) {
            this._loadingService.show();
            this.model.updatePolicyStatus(this.model.payment.policyId, POLICY_STATUS.SUSPENDED).subscribe(() => {
                if(!!this.model.payment) {
                    this.model.payment.policyStatusId = POLICY_STATUS.SUSPENDED;
                }
                this._loadingService.hide();
                AlertHelper.paymentsSuspended();
            })
        }
    }

    activatePayments(): void {
        if(!!this.model.payment) {
            this._loadingService.show();
            this.model.updatePolicyStatus(this.model.payment.policyId, POLICY_STATUS.CURRENT).subscribe(() => {
                if(!!this.model.payment) {
                    this.model.payment.policyStatusId = POLICY_STATUS.CURRENT;
                }
                this._loadingService.hide();
                AlertHelper.paymentsActivated();
            })
        }
    }

    updatePaymentDate(paymentDate: string): void {
        if(!!this.model.payment) {
            this.model.payment.paymentDate = paymentDate;
        }
    }
}
