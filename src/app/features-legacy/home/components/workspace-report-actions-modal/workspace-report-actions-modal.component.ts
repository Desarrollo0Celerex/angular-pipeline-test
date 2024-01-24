import { Component, OnInit } from '@angular/core';
import { ROUTES_NAME } from '@constants/routes-name';
import { WorkspaceReportActionsModalService } from './workspace-report-actions-modal.service';
import { SmartComponent } from '@core/classes/smart-component';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-workspace-report-actions-modal',
    templateUrl: './workspace-report-actions-modal.component.html',
    styles: [],
})
export class WorkspaceReportActionsModalComponent
    extends SmartComponent
    implements OnInit
{
    ROUTES_NAME = ROUTES_NAME;
    modalId = 'agt-workspace-report-actions-modal';

    constructor(
        private _workspaceReportActionsModalService: WorkspaceReportActionsModalService
    ) {
        super();
    }

    ngOnInit(): void {
        this._workspaceReportActionsModalService.workspaceReportActionsModal$
            .pipe(this.untilComponentDestroy())
            .subscribe(() => {
                this._openModal();
            });
    }

    private _openModal(): void {
        ModalPlugin.show(this.modalId);
    }
}
