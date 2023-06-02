import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { TASK_MODULES } from '@core/constants/settings';
import { WorkspaceUserService } from '@core/services/workspace-user/workspace-user.service';
import { ModuleService } from '@features/tasks/services/module.service';
import { TaskModalService } from '@features/tasks/services/task-modal.service';
declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-select-task-action',
    templateUrl: './modal-select-task-action.component.html',
    styles: [],
})
export class ModalSelectTaskActionComponent
    extends SmartComponent
    implements OnInit
{
    modalId = 'agt-modal-select-task-action';

    constructor(
        private _moduleService: ModuleService,
        private _taskModalService: TaskModalService,
        private _workspaceUserService: WorkspaceUserService
    ) {
        super();
    }

    ngOnInit(): void {
        this._moduleService.modalSelectTaskAction$
            .pipe(this.untilComponentDestroy())
            .subscribe(() => {
                ModalPlugin.show(this.modalId);
            });
    }

    showModalCreateTask(): void {
        this._workspaceUserService
            .getLoggedWorkspaceUser('shortName')
            .subscribe((user) => {
                this._taskModalService.showModalCreateTask({
                    taskTitle: `📌 Seguimiento de Tarea asignada por ${user.shortName}`,
                    taskModuleId: TASK_MODULES.OTHER,
                });
            });
    }
}
