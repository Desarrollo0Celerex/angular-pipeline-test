import { Component, EventEmitter, Output } from '@angular/core';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-payments-main-action',
    templateUrl: './payments-main-action.container.html',
    styles: [],
    standalone: false
})
export class PaymentsMainActionContainer {
    @Output() loadPolicy: EventEmitter<void> = new EventEmitter<void>();
    modalIdSearchPolicy: string = 'pma-modal-search-policy';
    modalIdSelectPaymentsActions: string = 'pma-modal-select-payments-actions';
    modalIdSelectPaymentsReportType: string =
        'pma-modal-select-payments-report-type';

    showModalToSearchPolicy(): void {
        ModalPlugin.show(this.modalIdSearchPolicy);
    }

    requestLoadPolicy(): void {
        this.loadPolicy.emit();
    }

    showModalToSelectPaymentsActions(): void {
        ModalPlugin.show(this.modalIdSelectPaymentsActions);
    }

    showModalToSelectReportType(): void {
        ModalPlugin.show(this.modalIdSelectPaymentsReportType);
    }
}
