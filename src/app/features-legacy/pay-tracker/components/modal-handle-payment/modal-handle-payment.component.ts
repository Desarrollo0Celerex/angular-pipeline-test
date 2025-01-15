import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { TASK_MODULES } from '@core/constants/settings';
import { PaymentService } from '@core/services/payment/payment.service';
import { environment } from '@env/environment';
import { CreateTaskComponent } from '@tasks/components/create-task/create-task.component';
import { ModalCreatePaymentCommentComponent } from '../modal-create-payment-comment/modal-create-payment-comment.component';
import { CreateTaskService } from '@tasks/components/create-task/create-task.service';
import { SendPaymentReminderComponent } from '@payment/components/send-payment-reminder/send-payment-reminder.component';
declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-handle-payment',
    templateUrl: './modal-handle-payment.component.html',
    styles: [],
    standalone: false
})
export class ModalHandlePaymentComponent {
    @Input() modalId: string = '';
    @Input() isPreauthorizedPayment: string = '';
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    @Input() paymentId: string = '';
    @Output() applyPayment: EventEmitter<void> = new EventEmitter<void>();
    @Output() selectPaymentType: EventEmitter<void> = new EventEmitter<void>();
    @ViewChild(CreateTaskComponent)
    createTaskComponent!: CreateTaskComponent;
    @ViewChild(ModalCreatePaymentCommentComponent)
    modalCreatePaymentCommentComponent!: ModalCreatePaymentCommentComponent;
    @ViewChild(SendPaymentReminderComponent)
    sendPaymentReminderComponent!: SendPaymentReminderComponent;
    alertMessage = '';
    alertType = '';
    canShowAlert = false;
    modalIdDownloadPolicy = 'agt-download-policy-modal';

    constructor(
        private _createTaskService: CreateTaskService,
        private _paymentService: PaymentService
    ) {}

    get applyPaymentLabel(): string {
        return this.isPreauthorizedPayment === '1'
            ? 'CONFIRMAR PAGO'
            : 'APLICAR PAGO';
    }

    requestApplyPayment(): void {
        this.closeModal();
        this.applyPayment.emit();
        /* if (this.isPreauthorizedPayment === '1') {
            this.applyPayment.emit();
        } else {
            this.selectPaymentType.emit();
        } */
    }

    commentAdded(): void {
        ModalPlugin.show(this.modalId);
        this.alertMessage = 'La nota se guardó con éxito.';
        this.canShowAlert = true;
    }

    showModalCreateComment(): void {
        this.closeModal();
        this.modalCreatePaymentCommentComponent.init(this.paymentId);
    }

    showModalCreateTask(): void {
        this.closeModal();
        this._loadPayment();
    }

    showModalDownloadPolicy(): void {
        this.closeModal();
        ModalPlugin.show(this.modalIdDownloadPolicy);
    }

    showAlertReminderSent(data: {
        notificationWasSent: boolean;
        notificationIsRepeated: boolean;
    }): void {
        ModalPlugin.show(this.modalId);
        this.canShowAlert = true;
        if (data.notificationWasSent) {
            this.alertMessage = 'El recordatorio se envió con éxito.';
            this.alertType = 'success';
        } else {
            if (data.notificationIsRepeated) {
                this.alertMessage = 'El recordatorio ya ha sido enviado.';
                this.alertType = 'warning';
            } else {
                this.alertMessage = 'El recordatorio no pudo ser enviado.';
                this.alertType = 'danger';
            }
        }
    }

    requestSendReminder(): void {
        this.closeModal();
        this.sendPaymentReminderComponent.openModal(
            this.contactId,
            this.policyId,
            this.paymentId
        );
    }

    closeModal(): void {
        ModalPlugin.hide(this.modalId);
        this.alertMessage = '';
        this.canShowAlert = false;
    }

    private _loadPayment(): void {
        const fields =
            'tickets,bills,policyNumber,insuranceName,coveredProperty,titularName,insurerName,contactName';
        this._paymentService
            .getWorkspacePayment(this.paymentId, fields)
            .subscribe((payment) => {
                this._createTaskService.openModal({
                    title: 'Programar Pago',
                    message: 'Ingresa los detalles para programar el pago. ',
                    buttonLabel: '📆 PROGRAMAR PAGO',
                    cancelRoute: [],
                    taskModuleId: TASK_MODULES.PAYMENT,
                });
                const subject = `💰 Seguimiento de Cobranza de ${payment.contactName}`;
                const details = `🎯 Seguimiento de cobranza para el pago del recibo ${
                    payment.tickets + 1
                } de ${payment.bills} de la póliza ${payment.policyNumber} (${
                    payment.insuranceName
                }: ${payment.coveredProperty}) de ${
                    payment.titularName
                }, emitida con ${payment.insurerName}.

💵 Pagos Pendientes: ${
                    environment.agenthos.appUrl
                }/workspace/payments/pending-receipts/${this.contactId}/${
                    this.policyId
                }/${this.paymentId}
📊 Historial de Póliza: ${
                    environment.agenthos.appUrl
                }/workspace/policies/history-policy/${this.contactId}/${
                    this.policyId
                }
🪪 Perfil de Cliente: ${environment.agenthos.appUrl}/workspace/contact-profile/${
                    this.contactId
                }/resume

🤖 Tarea gestionada en Agenthos.`;
                this._createTaskService.patchTask({ subject, details });
            });
    }
}
