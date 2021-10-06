import { Component, Input, OnInit } from '@angular/core';

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
    modalIdChangePaymentDate: string = 'agt-modal-change-payment-date';
    modalIdShowPolicyFile: string = 'agt-modal-show-policy-file';

    constructor(private _containerPaymentsManagerService: ContainerPaymentsManagerService) { }

    ngOnInit(): void {
        this.model.loadPayment(this.paymentId);
    }

    get model(): ContainerPaymentsManagerService {
        return this._containerPaymentsManagerService;
    }

    showModalToChangePaymentDate(): void {
        if(!!this.model.payment) {
            ModalPlugin.setFixed();
            ModalPlugin.show(this.modalIdChangePaymentDate);
        }
    }

    showPolicy(): void {
        if(!!this.model.payment) {
            ModalPlugin.show(this.modalIdShowPolicyFile);
        }
    }

    updatePaymentDate(paymentDate: string): void {
        ModalPlugin.removeFixed();
        if(!!this.model.payment) {
            this.model.payment.paymentDate = paymentDate;
        }
    }
}
