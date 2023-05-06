import { Component } from '@angular/core';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-payments-main-action',
    templateUrl: './payments-main-action.container.html',
    styles: [],
})
export class PaymentsMainActionContainer {
    modalIdSearchPolicy: string = 'pma-modal-search-policy';
    modalIdSelectPaymentsActions: string = 'pma-modal-select-payments-actions';
    modalIdSelectPaymentsReportType: string =
        'pma-modal-select-payments-report-type';

    showModalToSearchPolicy(): void {
        ModalPlugin.show(this.modalIdSearchPolicy);
    }

    showModalToSelectContactType(): void {
        console.log('Mostar modal para cargar póliza!');
    }

    showModalToSelectPaymentsActions(): void {
        ModalPlugin.show(this.modalIdSelectPaymentsActions);
    }

    showModalToSelectReportType(): void {
        ModalPlugin.show(this.modalIdSelectPaymentsReportType);
    }
}
