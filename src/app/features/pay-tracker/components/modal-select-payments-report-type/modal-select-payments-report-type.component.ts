import { Component, Input } from '@angular/core';
import { ROUTES_NAME } from '@constants/routes-name';
import { DumbComponent } from '@core/classes/dumb-component';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-select-payments-report-type',
    templateUrl: './modal-select-payments-report-type.component.html',
    styles: [],
})
export class ModalSelectPaymentsReportTypeComponent extends DumbComponent {
    @Input() modalId: string = '';
    receiptsPaidLink: string = `/${ROUTES_NAME.workspaceReceiptsPaidByRange}`;
    receiptsPendingLink: string = `/${ROUTES_NAME.workspaceReceiptsPendingByRange}`;

    constructor() {
        super();
    }

    closeModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
