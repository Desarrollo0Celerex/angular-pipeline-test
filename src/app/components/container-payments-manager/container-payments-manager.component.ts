import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { POLICY_STATUS } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { LoadingService } from '@services/loading.service';

import { ContainerPaymentsManagerService } from './container-payments-manager.service';

declare var ModalPlugin: any;

const PAYMENT_ACTIONS: any = {
    SHOW_HISTORY: 1,
    RECEIPTS_PAID: 2,
    PENDING_RECEIPTS: 3
}

@Component({
  selector: 'agt-container-payments-manager',
  templateUrl: './container-payments-manager.component.html',
  styles: [
  ],
  providers: [ContainerPaymentsManagerService]
})
export class ContainerPaymentsManagerComponent implements OnInit {
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    @Input() paymentId: string = '';
    @Input() canShowPendingReceipts: boolean = true;
    PAYMENT_ACTIONS: any = PAYMENT_ACTIONS;
    POLICY_STATUS: any = POLICY_STATUS;
    modalIdChangePaymentDate: string = 'cpm-modal-change-payment-date';
    modalIdShowPolicyFile: string = 'cpm-modal-show-policy-file';
    modalIdConfirmShowHistoryPolicy: string = 'cpm-confirm-show-history-policy';
    modalIdConfirmSuspendPayments: string = 'cpm-modal-confirm-suspend-payments';
    modalIdConfirmActivatePayments: string = 'cpm-modal-confirm-activate-payments';
    modalIdConfirmShowPendingReceipts: string = 'cpm-modal-confirm-show-pending-payments';
    modalIdConfirmShowReceiptsPaid: string = 'cpm-modal-confirm-show-payments-paid';
    modalIdConfirmShowPaymentHistory: string = 'cpm-modal-confirm-show-payment-history';
    selectedPaymentAction: number = 0;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _containerPaymentsManagerService: ContainerPaymentsManagerService,
        private _loadingService: LoadingService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.model.loadPayment(this.paymentId);
        /* this.policyData = {
            contactId: this.contactId,
            policyId: this.policyId
        } */
        this._selectPaymentAction();
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

    goToPolicyHistory(): void {
        this._router.navigateByUrl(ROUTES_NAME.showHistoryPolicy(this.contactId, this.policyId))
    }

    goToPaymentHistory(): void {
        this._router.navigateByUrl(ROUTES_NAME.paymentHistory(this.contactId, this.policyId, this.paymentId));
    }

    goToPendingReceipts(): void {
        this._router.navigateByUrl(ROUTES_NAME.pendingReceipts(this.contactId, this.policyId, this.paymentId));
    }

    showModalToConfirmShowPaymentHistory(): void {
        if(this.selectedPaymentAction !== PAYMENT_ACTIONS.SHOW_HISTORY) {
            ModalPlugin.show(this.modalIdConfirmShowPaymentHistory);
        }
    }

    showModalToConfirmShowReceiptsPaid(): void {
        if(this.selectedPaymentAction !== PAYMENT_ACTIONS.RECEIPTS_PAID) {
            ModalPlugin.show(this.modalIdConfirmShowReceiptsPaid);
        }
    }

    showModalToConfirmShowPendingReceipts(): void {
        if(this.selectedPaymentAction !== PAYMENT_ACTIONS.PENDING_RECEIPTS) {
            ModalPlugin.show(this.modalIdConfirmShowPendingReceipts);
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

    reloadPage(): void {
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate(['/' + this._router.url], { relativeTo: this._activatedRoute });
    }
    
    private _selectPaymentAction(): void {
        const currentUrl: string = this._router.url;
        if(currentUrl.includes('payment-history')) {
            this.selectedPaymentAction = PAYMENT_ACTIONS.SHOW_HISTORY;
        } else if(currentUrl.includes('receipts-paid')) {
            this.selectedPaymentAction = PAYMENT_ACTIONS.RECEIPTS_PAID;
        } else if(currentUrl.includes('pending-receipts')) {
            this.selectedPaymentAction = PAYMENT_ACTIONS.PENDING_RECEIPTS;
        }
    }
}
