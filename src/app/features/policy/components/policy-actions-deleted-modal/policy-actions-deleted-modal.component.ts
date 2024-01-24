import { Component } from '@angular/core';
import { ContactCategoryModalService } from '@contact/components/contact-category-modal/contact-category-modal.service';
import { CONTACT_ACTIONS } from '@contact/enums/contact-actions.enum';
import { TASK_MODULES } from '@core/constants/settings';
import { WorkspaceReportActionsModalService } from '@features-legacy/home/components/workspace-report-actions-modal/workspace-report-actions-modal.service';
import { CreateTaskService } from '@tasks/components/create-task/create-task.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-policy-actions-deleted-modal',
    templateUrl: './policy-actions-deleted-modal.component.html',
    styles: [],
})
export class PolicyActionsDeletedModalComponent {
    modalId = 'agt-policy-actions-deleted';

    constructor(
        private _contactCategoryModalService: ContactCategoryModalService,
        private _createTaskService: CreateTaskService,
        private _workspaceReportActionsModalService: WorkspaceReportActionsModalService
    ) {}

    openModal(): void {
        ModalPlugin.show(this.modalId);
    }

    createPolicy(): void {
        this._contactCategoryModalService.openModal(
            CONTACT_ACTIONS.CREATE_POLICY
        );
    }

    scheduleTask(): void {
        this._createTaskService.openModal({
            title: 'Programar Tarea',
            message: 'Ingresa los detalles para programar la tarea.',
            buttonLabel: '📆 AGENDAR SEGUIMIENTO',
            taskModuleId: TASK_MODULES.POLICY,
            cancelRoute: [],
        });
    }

    showReportsModal(): void {
        this._workspaceReportActionsModalService.openModal();
    }
}
