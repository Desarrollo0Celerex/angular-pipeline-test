import { Component, ViewChild } from '@angular/core';
import { ROUTES_NAME } from '@constants/routes-name';
import { TASK_MODULES } from '@core/constants/settings';
import { environment } from '@env/environment';
import { FollowPolicy } from '@policies/interfaces/follow-policy.interface';
import { Policy } from '@policies/interfaces/policy.interface';
import { PolicyService } from '@policies/services/policy.service';
import { CreateTaskComponent } from '@tasks/components/create-task/create-task.component';

@Component({
    selector: 'agt-follow-policy',
    templateUrl: './follow-policy.component.html',
    styles: [],
})
export class FollowPolicyComponent {
    @ViewChild(CreateTaskComponent)
    createTaskComponent!: CreateTaskComponent;

    constructor(private _policyService: PolicyService) {}

    init(data: FollowPolicy): void {
        this.createTaskComponent.init({
            title: 'Seguimiento de Póliza',
            message: 'Ingresa los detalles para programar el seguimiento. ',
            buttonLabel: '📆 AGENDAR SEGUIMIENTO',
            cancelRoute: data.cancelRoute,
            taskModuleId: TASK_MODULES.POLICY,
        });
        this._loadPolicy(data.contactId, data.policyId);
    }

    private _loadPolicy(contactId: string, policyId: string): void {
        const fields =
            'contactId,policyId,paymentId,policyNumber,insuranceName,coveredProperty,titularName,insurerName,paymentId';
        this._policyService
            .getContactPolicy(contactId, policyId, fields)
            .subscribe((policy) => {
                this._patchTask(policy);
            });
    }

    private _patchTask(policy: Policy): void {
        const subject = this._generateSubject(policy.policyNumber);
        const details = this._generateDetails(policy);
        this.createTaskComponent.patchTaskValues(subject, details);
    }

    private _generateDetails(policy: Policy): string {
        const domain = environment.appAgenthosUrl + '/';
        const pendingReceipsRoute =
            domain +
            ROUTES_NAME.pendingReceipts(
                policy.contactId,
                policy.policyId,
                policy.paymentId
            );
        const policyRecord =
            domain +
            ROUTES_NAME.showHistoryPolicy(policy.contactId, policy.policyId);
        const contactProfile =
            domain + ROUTES_NAME.contactResume(policy.contactId);
        return `🎯 Seguimiento especial para la póliza ${policy.policyNumber} (${policy.insuranceName}: ${policy.coveredProperty}) de ${policy.titularName}, emitida con ${policy.insurerName}.

💵 Pagos Pendientes: ${pendingReceipsRoute}
📊 Historial de Póliza: ${policyRecord}
🪪 Perfil de Cliente: ${contactProfile}

🤖 Tarea gestionada en Agenthos.`;
    }

    private _generateSubject(policyNumber: string): string {
        return '📄 Seguimiento de Póliza: ' + policyNumber;
    }
}
