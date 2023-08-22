import { Component, ViewChild } from '@angular/core';
import { ROUTES_NAME } from '@constants/routes-name';
import { PolicySenderComponent } from '../policy-sender/policy-sender.component';
import { SelectActionForSavedPolicy } from '@features/policy/interfaces/policy-actions.interface';
import { AlertHelper } from '@core/helpers/alert.helper';
import { Router } from '@angular/router';
import { TaskModalService } from '@features/tasks/services/task-modal.service';
import { TASK_MODULES } from '@core/constants/settings';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-policy-actions',
    templateUrl: './policy-actions.component.html',
    styles: [],
})
export class PolicyActionsComponent {
    @ViewChild(PolicySenderComponent)
    policySenderComponent!: PolicySenderComponent;
    data: SelectActionForSavedPolicy | undefined = undefined;
    modalId = 'agt-policy-actions';
    modalIdShowPolicy = 'modal-show-policy';
    routeContactPolicies = '';
    routePolicyPendingReceipts = '';
    routePolicyRecord = '';

    constructor(
        private _router: Router,
        private _taskModalService: TaskModalService
    ) {}

    sendPolicy(): void {
        this.policySenderComponent.sendPolicy({
            contactId: this.data!.contactId,
            policyId: this.data!.policyId,
            cancelRoute: this.routeContactPolicies,
            phoneCode: this.data!.phoneCode,
            phoneNumber: this.data!.phoneNumber,
            email: this.data!.email,
        });
    }

    showAlertPolicySent(): void {
        AlertHelper.policySent(this._goToListContactPolicies, this);
    }

    showModalToCreateTask(): void {
        this._taskModalService.showModalCreateTask({
            taskTitle: `📌 Seguimiento de Póliza`,
            taskModuleId: TASK_MODULES.OTHER,
            cancelRoute: this.routeContactPolicies,
        });
    }

    showModalToDownloadPolicy(): void {
        ModalPlugin.show(this.modalIdShowPolicy);
    }

    showModal(data: SelectActionForSavedPolicy): void {
        this.data = data;
        this._initRoutes();
        ModalPlugin.show(this.modalId);
    }

    private _initRoutes(): void {
        this.routeContactPolicies =
            '/' + ROUTES_NAME.listContactPolicies(this.data!.contactId);
        this.routePolicyPendingReceipts =
            '/' +
            ROUTES_NAME.pendingReceipts(
                this.data!.contactId,
                this.data!.policyId,
                this.data!.paymentId
            );

        this.routePolicyRecord =
            '/' +
            ROUTES_NAME.showHistoryPolicy(
                this.data!.contactId,
                this.data!.policyId
            );
    }

    private _goToListContactPolicies(context: PolicyActionsComponent): void {
        context._router.navigateByUrl(
            ROUTES_NAME.listContactPolicies(context.data!.contactId)
        );
    }
}
