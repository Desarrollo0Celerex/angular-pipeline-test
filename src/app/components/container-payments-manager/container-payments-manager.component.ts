import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { POLICY_STATUS } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
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
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    @Input() paymentId: string = '';
    @Input() canShowPendingReceipts: boolean = true;
    POLICY_STATUS: any = POLICY_STATUS;
    modalIdChangePaymentDate: string = 'agt-modal-change-payment-date';
    modalIdShowPolicyFile: string = 'agt-modal-show-policy-file';
    modalIdConfirmSuspendPayments: string = 'agt-modal-confirm-suspend-payments';
    modalIdConfirmActivatePayments: string = 'agt-modal-confirm-activate-payments';

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _containerPaymentsManagerService: ContainerPaymentsManagerService,
        private _loadingService: LoadingService,
        private _router: Router
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

    goToPaymentHistory(): void {
        this._router.navigateByUrl(ROUTES_NAME.paymentHistory(this.contactId, this.policyId, this.paymentId));
    }

    goToPendingReceipts(): void {
        this._router.navigateByUrl(ROUTES_NAME.pendingReceipts(this.contactId, this.policyId, this.paymentId));
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

    reloadPage(): void {
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate(['/' + this._router.url], { relativeTo: this._activatedRoute });
    }
}
