import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { CancelPolicyModalService } from './cancel-policy-modal.service';
import { POLICY_ROUTES } from '@policy/constants/routes';
import { DeletePolicyModalComponent } from '../delete-policy-modal/delete-policy-modal.component';
import { CreateTaskService } from '@tasks/components/create-task/create-task.service';
import { TASK_MODULES } from '@core/constants/settings';
import { PolicyService } from '@policy/services/policy.service';
import { environment } from '@env/environment';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-cancel-policy-modal',
    templateUrl: './cancel-policy-modal.component.html',
    styles: [],
    standalone: false
})
export class CancelPolicyModalComponent extends SmartComponent {
    @Output() policyDeleted = new EventEmitter<void>();
    @ViewChild(DeletePolicyModalComponent)
    deletePolicyModalComponent!: DeletePolicyModalComponent;
    modalId = 'agt-cancel-policy-modal';
    private _contactId = '';
    private _policyId = '';

    constructor(
        private _cancelPolicyModalService: CancelPolicyModalService,
        private _createTaskService: CreateTaskService,
        private _policyService: PolicyService
    ) {
        super();
    }

    ngOnInit(): void {
        this._cancelPolicyModalService.cancelPolicyModal$
            .pipe(this.untilComponentDestroy())
            .subscribe((data) => {
                this._openModal(data);
            });
    }

    get cancelPolicyRoute(): string {
        return (
            '/' + POLICY_ROUTES.cancelPolicy(this._contactId, this._policyId)
        );
    }

    confirmDeletePolicy(): void {
        this.deletePolicyModalComponent.init(this._contactId, this._policyId);
    }

    onPolicyDeleted(): void {
        this.policyDeleted.emit();
    }

    scheduleFollowUp(): void {
        this._createTaskService.openModal({
            title: 'Seguimiento de Cancelación',
            message: 'Ingresa los detalles para programar el seguimiento.',
            buttonLabel: '📆 AGENDAR SEGUIMIENTO',
            cancelRoute: [],
            taskModuleId: TASK_MODULES.POLICY,
        });
        this._loadPolicy();
    }

    showPolicyActionsModal(): void {}

    private _loadPolicy(): void {
        const fields =
            'policyNumber,insuranceName,coveredProperty,titularName,insurerName,contactName,paymentId';
        this._policyService
            .getContactPolicy(this._contactId, this._policyId, fields)
            .subscribe((policy) => {
                const subject = `📄 Seguimiento de Cancelación: ${policy.policyNumber}`;
                const details = `🎯 Seguimiento para cancelar la póliza ${policy.policyNumber} (${policy.insuranceName}: ${policy.coveredProperty}) de ${policy.titularName}, emitida con ${policy.insurerName}.

💵 Pagos Pendientes: ${environment.agenthos.appUrl}/workspace/policys/pending-receipts/${this._contactId}/${this._policyId}/${policy.paymentId}
📊 Historial de Póliza: ${environment.agenthos.appUrl}/workspace/policies/history-policy/${this._contactId}/${this._policyId}
🪪 Perfil de Cliente: ${environment.agenthos.appUrl}/workspace/contact-profile/${this._contactId}/resume

🤖 Tarea gestionada en Agenthos.`;
                this._createTaskService.patchTask({ subject, details });
            });
    }

    private _openModal(data: { contactId: string; policyId: string }): void {
        this._contactId = data.contactId;
        this._policyId = data.policyId;
        ModalPlugin.show(this.modalId);
    }
}
