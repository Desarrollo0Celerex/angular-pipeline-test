import { Component } from '@angular/core';
import { ROUTES_NAME } from '@constants/routes-name';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-workspace-report-actions-modal',
    templateUrl: './workspace-report-actions-modal.component.html',
    styles: [],
})
export class WorkspaceReportActionsModalComponent {
    ROUTES_NAME = ROUTES_NAME;
    modalId = 'agt-workspace-report-actions-modal';

    showModal(): void {
        ModalPlugin.show(this.modalId);
    }
}
