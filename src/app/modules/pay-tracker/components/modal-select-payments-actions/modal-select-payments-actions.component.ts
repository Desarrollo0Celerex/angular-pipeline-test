import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DumbComponent } from '@core/classes/dumb-component';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-select-payments-actions',
    templateUrl: './modal-select-payments-actions.component.html',
    styles: [],
})
export class ModalSelectPaymentsActionsComponent extends DumbComponent {
    @Input() modalId: string = '';
    @Output() applyPayment: EventEmitter<void> = new EventEmitter<void>();
    @Output() generateReport: EventEmitter<void> = new EventEmitter<void>();
    @Output() loadPolicy: EventEmitter<void> = new EventEmitter<void>();

    constructor() {
        super();
    }

    requestApplyPayment(): void {
        this.applyPayment.emit();
        this._closeModal();
    }

    requestGenerateReport(): void {
        this.generateReport.emit();
        this._closeModal();
    }

    requestLoadPolicy(): void {
        this.loadPolicy.emit();
        this._closeModal();
    }

    private _closeModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
