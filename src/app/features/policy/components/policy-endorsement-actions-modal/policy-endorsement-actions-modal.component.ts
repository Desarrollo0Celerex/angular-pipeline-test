import { Component, OnInit } from '@angular/core';
import { PolicyEndorsementActionsModalService } from './policy-endorsement-actions-modal.service';
import { SmartComponent } from '@core/classes/smart-component';
import { ENDORSEMENT_ROUTES } from '@endorsement/constants/routes';
import { CreateTaskService } from '@tasks/components/create-task/create-task.service';
import { TASK_MODULES } from '@core/constants/settings';
import { PolicyService } from '@policy/services/policy.service';
import { environment } from '@env/environment';
import { POLICY_ROUTES } from '@policy/constants/routes';
import * as moment from 'moment';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-policy-endorsement-actions-modal',
    templateUrl: './policy-endorsement-actions-modal.component.html',
    styles: [],
})
export class PolicyEndorsementActionsModalComponent
    extends SmartComponent
    implements OnInit
{
    alertMessage = '';
    contactId = '';
    endorsementDays = -1;
    modalId = 'agt-policy-endorsement-actions-modal';
    policyId = '';

    constructor(
        private _createTaskService: CreateTaskService,
        private _policyService: PolicyService,
        private _policyEndorsementActionsModalService: PolicyEndorsementActionsModalService
    ) {
        super();
    }

    ngOnInit(): void {
        this._policyEndorsementActionsModalService.policyEndorsementActionsModal$
            .pipe(this.untilComponentDestroy())
            .subscribe((data) => {
                this.contactId = data.contactId;
                this.policyId = data.policyId;
                this._openModal();
                this._loadLastEndorsementDate();
            });
    }

    get createEndorsementRoute(): string {
        return (
            '/' +
            ENDORSEMENT_ROUTES.createEndorsement(this.contactId, this.policyId)
        );
    }

    get endorsementRecordRoute(): string {
        return (
            '/' +
            ENDORSEMENT_ROUTES.policyEndorsementsRecord(
                this.contactId,
                this.policyId
            )
        );
    }

    get policyTrackerRoute(): string {
        return '/' + POLICY_ROUTES.policyTracker(this.contactId, this.policyId);
    }

    scheduleFollowUp(): void {
        this._createTaskService.openModal({
            title: 'Seguimiento de Endoso',
            message: 'Ingresa los detalles para programar el seguimiento.',
            buttonLabel: '📆 AGENDAR SEGUIMIENTO',
            cancelRoute: [],
            taskModuleId: TASK_MODULES.ENDORSEMENT,
        });
        this._loadPolicy();
    }
    private _calculateDays(lastEndorsementDate: string | null): void {
        if (lastEndorsementDate !== null) {
            const currentDate = moment();
            this.endorsementDays = currentDate.diff(
                lastEndorsementDate,
                'days'
            );
        } else {
            this.endorsementDays = -1;
        }
    }

    private _generateAlertMessage(): void {
        this.alertMessage = '';
        if (this.endorsementDays !== -1) {
            if (this.endorsementDays === 0) {
                this.alertMessage = 'La póliza se endosó <strong>hoy</strong>.';
            } else if (this.endorsementDays === 1) {
                this.alertMessage =
                    'La póliza se endosó hace <strong>1</strong> día.';
            } else {
                this.alertMessage =
                    'La póliza se endosó hace <strong>' +
                    this.endorsementDays +
                    '</strong> días.';
            }
        }
    }

    private _loadLastEndorsementDate(): void {
        this.alertMessage = '';
        const fields = 'lastEndorsementDate';
        this._policyService
            .getContactPolicy(this.contactId, this.policyId, fields)
            .subscribe((policy) => {
                this._calculateDays(policy.lastEndorsementDate);
                this._generateAlertMessage();
            });
    }

    private _loadPolicy(): void {
        const fields =
            'policyNumber,insuranceName,coveredProperty,titularName,insurerName,contactName,paymentId';
        this._policyService
            .getContactPolicy(this.contactId, this.policyId, fields)
            .subscribe((policy) => {
                const subject = `📄 Seguimiento de Endoso: ${policy.policyNumber}`;
                const details = `🎯 Seguimiento para aplicar un endoso a la póliza ${policy.policyNumber} (${policy.insuranceName}: ${policy.coveredProperty}) de ${policy.titularName}, emitida con ${policy.insurerName}.

💵 Pagos Pendientes: ${environment.agenthos.appUrl}/workspace/policys/pending-receipts/${this.contactId}/${this.policyId}/${policy.paymentId}
📊 Historial de Póliza: ${environment.agenthos.appUrl}/workspace/policies/history-policy/${this.contactId}/${this.policyId}
🪪 Perfil de Cliente: ${environment.agenthos.appUrl}/workspace/contact-profile/${this.contactId}/resume

🤖 Tarea gestionada en Agenthos.`;
                this._createTaskService.patchTask({ subject, details });
            });
    }

    private _openModal(): void {
        ModalPlugin.show(this.modalId);
    }
}
