import { Component, OnInit } from '@angular/core';
import { SelectClientTypeModalService } from '@client/components/select-client-type-modal/select-client-type-modal.service';
import { SmartComponent } from '@core/classes/smart-component';
import { PolicyService } from '@policy/services/policy.service';
import { CreateTaskService } from '@tasks/components/create-task/create-task.service';
import { PolicyRenewalActionsModalService } from './policy-renewal-actions-modal.service';
import { TASK_MODULES } from '@core/constants/settings';
import { environment } from '@env/environment';
import { CONTACT_ACTIONS } from '@contact/enums/contact-actions.enum';
import { POLICY_ROUTES } from '@policy/constants/routes';
import * as moment from 'moment';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-policy-renewal-actions-modal',
    templateUrl: './policy-renewal-actions-modal.component.html',
    styles: [],
})
export class PolicyRenewalActionsModalComponent
    extends SmartComponent
    implements OnInit
{
    alertMessage = '';
    modalId = 'agt-policy-reissue-actions-modal';
    contactId = '';
    policyId = '';
    actionType = 0;
    renewalDays = -1;

    constructor(
        private _createTaskService: CreateTaskService,
        private _policyService: PolicyService,
        private _policyRenewalActionsModalService: PolicyRenewalActionsModalService,
        private _selectClientTypeModalService: SelectClientTypeModalService
    ) {
        super();
    }

    ngOnInit(): void {
        this._policyRenewalActionsModalService.policyRenewalActionsModal$.subscribe(
            (data) => {
                this.contactId = data.contactId;
                this.policyId = data.policyId;
                this._openModal();
                this._loadRenewalDate();
            }
        );
    }

    get policyTrackerRoute(): string {
        return '/' + POLICY_ROUTES.policyTracker(this.contactId, this.policyId);
    }

    scheduleFollowUp(): void {
        this._createTaskService.openModal({
            title: 'Seguimiento de Renovación',
            message: 'Ingresa los detalles para programar el seguimiento.',
            buttonLabel: '📆 AGENDAR SEGUIMIENTO',
            cancelRoute: [],
            taskModuleId: TASK_MODULES.RENEWAL,
        });
        this._loadPolicy();
    }

    selectClientType(): void {
        this._selectClientTypeModalService.openModal({
            contactId: this.contactId,
            policyId: this.policyId,
            contactAction: CONTACT_ACTIONS.RENEW_POLICY,
            modalData: {
                title: 'Renovar Póliza',
                description:
                    'Selecciona el tipo de contratante para la renovación.',
            },
        });
    }

    private _calculateRenewalDays(reissueDate: string | null): void {
        if (reissueDate !== null) {
            const currentDate = moment();
            this.renewalDays = currentDate.diff(reissueDate, 'days');
        } else {
            this.renewalDays = -1;
        }
    }

    private _generateAlertMessage(): void {
        this.alertMessage = '';
        if (this.renewalDays !== -1) {
            if (this.renewalDays === 0) {
                this.alertMessage = 'La póliza se renovó <strong>hoy</strong>.';
            }
            if (this.renewalDays === 1) {
                this.alertMessage =
                    'La póliza se renovó hace <strong>1</strong> día.';
            }
            this.alertMessage =
                'La póliza se renovó hace <strong>' +
                this.renewalDays +
                '</strong> días.';
        }
    }

    private _loadPolicy(): void {
        const fields =
            'policyNumber,insuranceName,coveredProperty,titularName,insurerName,contactName,paymentId';
        this._policyService
            .getContactPolicy(this.contactId, this.policyId, fields)
            .subscribe((policy) => {
                const subject = `📄 Seguimiento de Renovación: ${policy.policyNumber}`;
                const details = `🎯 Seguimiento para la renovación de la póliza ${policy.policyNumber} (${policy.insuranceName}: ${policy.coveredProperty}) de ${policy.titularName}, emitida con ${policy.insurerName}.

💵 Pagos Pendientes: ${environment.agenthos.appUrl}/workspace/policys/pending-receipts/${this.contactId}/${this.policyId}/${policy.paymentId}
📊 Historial de Póliza: ${environment.agenthos.appUrl}/workspace/policies/history-policy/${this.contactId}/${this.policyId}
🪪 Perfil de Cliente: ${environment.agenthos.appUrl}/workspace/contact-profile/${this.contactId}/resume

🤖 Tarea gestionada en Agenthos.`;
                this._createTaskService.patchTask({ subject, details });
            });
    }

    private _loadRenewalDate(): void {
        this.alertMessage = '';
        const fields = 'renewalDate';
        this._policyService
            .getContactPolicy(this.contactId, this.policyId, fields)
            .subscribe((policy) => {
                this._calculateRenewalDays(policy.renewalDate);
                this._generateAlertMessage();
            });
    }

    private _openModal(): void {
        ModalPlugin.show(this.modalId);
    }
}
