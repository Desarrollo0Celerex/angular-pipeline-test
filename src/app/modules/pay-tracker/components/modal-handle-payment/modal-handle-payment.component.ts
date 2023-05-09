import { Component, EventEmitter, Input, Output } from '@angular/core';
declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-handle-payment',
    templateUrl: './modal-handle-payment.component.html',
    styles: [],
})
export class ModalHandlePaymentComponent {
    @Input() modalId: string = '';
    @Input() isPreauthorizedPayment: string = '';
    @Output() applyPayment: EventEmitter<void> = new EventEmitter<void>();
    @Output() scheduleTracking: EventEmitter<void> = new EventEmitter<void>();
    @Output() selectPaymentType: EventEmitter<void> = new EventEmitter<void>();
    @Output() sendReminder: EventEmitter<void> = new EventEmitter<void>();

    get applyPaymentLabel(): string {
        return this.isPreauthorizedPayment === '1'
            ? 'CONFIRMAR PAGO'
            : 'APLICAR PAGO';
    }

    requestApplyPayment(): void {
        this._closeModal();
        if (this.isPreauthorizedPayment === '1') {
            this.applyPayment.emit();
        } else {
            this.selectPaymentType.emit();
        }
    }

    requestScheduleTracking(): void {
        this._closeModal();
        this.scheduleTracking.emit();
    }

    requestSendReminder(): void {
        this._closeModal();
        this.sendReminder.emit();
    }

    private _closeModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
