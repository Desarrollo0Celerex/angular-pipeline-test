import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TASK_MODULES } from '@core/constants/settings';
import { PaymentService } from '@core/services/payment/payment.service';
import { environment } from '@env/environment';
import { InitModalCreateTask } from '@features/tasks/interfaces/init-modal-create-task.interface';
import { TaskModalService } from '@features/tasks/services/task-modal.service';
declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-handle-payment',
    templateUrl: './modal-handle-payment.component.html',
    styles: [],
})
export class ModalHandlePaymentComponent {
    @Input() modalId: string = '';
    @Input() isPreauthorizedPayment: string = '';
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    @Input() paymentId: string = '';
    @Output() applyPayment: EventEmitter<void> = new EventEmitter<void>();
    @Output() selectPaymentType: EventEmitter<void> = new EventEmitter<void>();
    @Output() sendReminder: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private _paymentService: PaymentService,
        private _taskModalService: TaskModalService
    ) {}

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

    showModalCreateTask(): void {
        this._closeModal();
        this._loadPayment();
    }

    requestSendReminder(): void {
        this._closeModal();
        this.sendReminder.emit();
    }

    private _closeModal(): void {
        ModalPlugin.hide(this.modalId);
    }

    private _loadPayment(): void {
        const fields =
            'tickets,bills,policyNumber,insuranceName,coveredProperty,titularName,insurerName';
        this._paymentService
            .getWorkspacePayment(this.paymentId, fields)
            .subscribe((payment) => {
                const modalData: Partial<InitModalCreateTask> = {
                    taskTitle: '💰 Seguimiento de Cobranza',
                    taskDetails: `🎯 Seguimiento de cobranza para el pago del recibo ${
                        payment.tickets + 1
                    } de ${payment.bills} de la póliza ${
                        payment.policyNumber
                    } (${payment.insuranceName}: ${
                        payment.coveredProperty
                    }) de ${payment.titularName}, emitida con ${
                        payment.insurerName
                    }.

💵 Pagos Pendientes: ${
                        environment.appAgenthosUrl
                    }/workspace/payments/pending-receipts/${this.contactId}/${
                        this.policyId
                    }/${this.paymentId}
📊 Historial de Póliza: ${
                        environment.appAgenthosUrl
                    }/workspace/policies/history-policy/${this.contactId}/${
                        this.policyId
                    }
🪪 Perfil de Cliente: ${environment.appAgenthosUrl}/workspace/contact-profile/${
                        this.contactId
                    }/resume

🤖 Tarea gestionada en Agenthos.`,
                    taskModuleId: TASK_MODULES.PAYMENT,
                };
                this._taskModalService.showModalCreateTask(modalData);
            });
    }
}
