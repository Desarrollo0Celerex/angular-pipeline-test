import { Component, ViewChild } from '@angular/core';
import { WorkspaceReportActionsModalComponent } from '../workspace-report-actions-modal/workspace-report-actions-modal.component';
import { ACTION_TYPES } from '@constants/global';
import { CreateTaskComponent } from '@tasks/components/create-task/create-task.component';
import { TASK_MODULES } from '@core/constants/settings';

declare var ModalPlugin: any;

enum CONTENT_TYPES {
    POLICY = 1,
    QUOTATION = 2,
}

@Component({
    selector: 'agt-workspace-quick-actions-modal',
    templateUrl: './workspace-quick-actions-modal.component.html',
    styles: [],
})
export class WorkspaceQuickActionsModalComponent {
    @ViewChild(WorkspaceReportActionsModalComponent)
    workspaceReportActionsModalComponent!: WorkspaceReportActionsModalComponent;
    @ViewChild(CreateTaskComponent)
    createTaskComponent!: CreateTaskComponent;
    modalId = 'wqam-workspace-quick-actions-modal';
    CONTENT_TYPES = CONTENT_TYPES;
    contactActionTitle = '';
    contactActionDescription = '';
    contactActionType = 0;
    modalIdSelectContactAction = 'wqam-modal-select-contact-action';
    modalIdSelectContactType = 'wqam-modal-select-contact-type';
    modalIdSearchContact = 'wqam-modal-search-contact';
    modalIdAgenthosSupport = 'wqam-modal-agenthos-support';
    private _selectedContentType = 0;

    showModal(): void {
        ModalPlugin.show(this.modalId);
    }

    showModalAgenthosSupport(): void {
        ModalPlugin.show(this.modalIdAgenthosSupport);
    }

    showModalCreateTask(): void {
        this.createTaskComponent.init({
            title: 'Programar Tarea',
            message: 'Ingresa los detalles para programar la tarea. ',
            buttonLabel: '📆 PROGRAMAR TAREA',
            cancelRoute: [],
            taskModuleId: TASK_MODULES.OTHER,
        });
        const subject = '📌 Seguimiento de Tarea';
        const details = '🎯 Seguimiento de tarea para ...';
        this.createTaskComponent.patchTaskValues(subject, details);
    }

    showModalWorkspaceReportActions(): void {
        this.workspaceReportActionsModalComponent.showModal();
    }

    showModalSelectContactAction(contentType: number): void {
        this._selectedContentType = contentType;
        this._generateContactActionData();
        ModalPlugin.show(this.modalIdSelectContactAction);
    }

    showModalToSelectContactType(): void {
        ModalPlugin.show(this.modalIdSelectContactType);
    }

    showModalToSearchContact(): void {
        this._selectContactActionType();
        ModalPlugin.show(this.modalIdSearchContact);
    }

    private _generateContactActionData(): void {
        switch (this._selectedContentType) {
            case CONTENT_TYPES.POLICY:
                this.contactActionTitle = 'Cargar Póliza';
                this.contactActionDescription =
                    'Selecciona a quién le deseas cargar la póliza.';
                break;

            default:
                this.contactActionTitle = 'Cotizar Seguro';
                this.contactActionDescription =
                    'Selecciona a quién le deseas cotizar un nuevo seguro.';
                break;
        }
    }

    private _selectContactActionType(): void {
        switch (this._selectedContentType) {
            case CONTENT_TYPES.POLICY:
                this.contactActionType = ACTION_TYPES.CREATE_POLICY;
                break;

            default:
                this.contactActionType = ACTION_TYPES.CREATE_QUOTATION;
                break;
        }
    }
}
