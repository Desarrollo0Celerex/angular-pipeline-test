import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { PolicyReissueActionsModalService } from './policy-reissue-actions-modal.service';
import { CreateTaskService } from '@tasks/components/create-task/create-task.service';
import { TASK_MODULES } from '@core/constants/settings';
import { PolicyService } from '@policy/services/policy.service';
import { environment } from '@env/environment';
import moment from 'moment';
import { POLICY_ROUTES } from '@policy/constants/routes';
import { SelectClientTypeModalService } from '@client/components/select-client-type-modal/select-client-type-modal.service';
import { CONTACT_ACTIONS } from '@contact/enums/contact-actions.enum';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-policy-reissue-actions-modal',
    templateUrl: './policy-reissue-actions-modal.component.html',
    styles: [],
})
export class PolicyReissueActionsModalComponent
    extends SmartComponent
    implements OnInit
{
    alertMessage = '';
    modalId = 'agt-policy-reissue-actions-modal';
    contactId = '';
    policyId = '';
    actionType = 0;
    reissueDays = -1;

    constructor(
        private _createTaskService: CreateTaskService,
        private _policyService: PolicyService,
        private _policyReissueActionsModalService: PolicyReissueActionsModalService,
        private _selectClientTypeModalService: SelectClientTypeModalService
    ) {
        super();
    }

    ngOnInit(): void {
        this._policyReissueActionsModalService.policyReissueActionsModal$
            .pipe(this.untilComponentDestroy())
            .subscribe((data) => {
                this.contactId = data.contactId;
                this.policyId = data.policyId;
                this._openModal();
                this._loadReissueDate();
            });
    }

    get policyTrackerRoute(): string {
        return '/' + POLICY_ROUTES.policyTracker(this.contactId, this.policyId);
    }

    selectClientType(): void {
        this._selectClientTypeModalService.openModal({
            contactId: this.contactId,
            policyId: this.policyId,
            contactAction: CONTACT_ACTIONS.REISSUE_POLICY,
            modalData: {
                title: 'Reexpedir Póliza',
                description:
                    'Selecciona el tipo de contratante para la reexpedición.',
            },
        });
    }

    scheduleFollowUp(): void {
        this._createTaskService.openModal({
            title: 'Seguimiento de Reexpedición',
            message: 'Ingresa los detalles para programar el seguimiento.',
            buttonLabel: '📆 AGENDAR SEGUIMIENTO',
            cancelRoute: [],
            taskModuleId: TASK_MODULES.REISSUE,
        });
        this._loadPolicy();
    }

    private _openModal(): void {
        ModalPlugin.show(this.modalId);
    }

    private _calculateReissueDays(reissueDate: string | null): void {
        if (reissueDate !== null) {
            const currentDate = moment();
            this.reissueDays = currentDate.diff(reissueDate, 'days');
        } else {
            this.reissueDays = -1;
        }
    }

    private _generateAlertMessage(): void {
        this.alertMessage = '';
        if (this.reissueDays !== -1) {
            if (this.reissueDays === 0) {
                this.alertMessage =
                    'La póliza se reexpidió <strong>hoy</strong>.';
            } else if (this.reissueDays === 1) {
                this.alertMessage =
                    'La póliza se reexpidió hace <strong>1</strong> día.';
            } else {
                this.alertMessage =
                    'La póliza se reexpidió hace <strong>' +
                    this.reissueDays +
                    '</strong> días.';
            }
        }
    }

    private _loadReissueDate(): void {
        this.alertMessage = '';
        const fields = 'reissueDate';
        this._policyService
            .getContactPolicy(this.contactId, this.policyId, fields)
            .subscribe((policy) => {
                this._calculateReissueDays(policy.reissueDate);
                this._generateAlertMessage();
            });
    }

    private _loadPolicy(): void {
        const fields =
            'policyNumber,insuranceName,coveredProperty,titularName,insurerName,contactName,paymentId';
        this._policyService
            .getContactPolicy(this.contactId, this.policyId, fields)
            .subscribe((policy) => {
                const subject = `📄 Seguimiento de Reexpedición: ${policy.policyNumber}`;
                const details = `🎯 Seguimiento para la reexpedición de la póliza ${policy.policyNumber} (${policy.insuranceName}: ${policy.coveredProperty}) de ${policy.titularName}, emitida con ${policy.insurerName}.

💵 Pagos Pendientes: ${environment.agenthos.appUrl}/workspace/policys/pending-receipts/${this.contactId}/${this.policyId}/${policy.paymentId}
📊 Historial de Póliza: ${environment.agenthos.appUrl}/workspace/policies/history-policy/${this.contactId}/${this.policyId}
🪪 Perfil de Cliente: ${environment.agenthos.appUrl}/workspace/contact-profile/${this.contactId}/resume

🤖 Tarea gestionada en Agenthos.`;
                this._createTaskService.patchTask({ subject, details });
            });
    }
}
