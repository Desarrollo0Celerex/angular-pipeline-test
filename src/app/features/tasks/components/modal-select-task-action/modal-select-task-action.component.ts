import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { TASK_MODULES } from '@core/constants/settings';
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
        private _taskModalService: TaskModalService
    ) {
        super();
    }

    ngOnInit(): void {
        this._moduleService.modalCreateTask$
            .pipe(this.untilComponentDestroy())
            .subscribe(() => {
                ModalPlugin.show(this.modalId);
            });
    }

    showModalCreateTask(): void {
        this._taskModalService.showModalCreateTask({
            taskTitle: '📌 Seguimiento de Tarea',
            taskModuleId: TASK_MODULES.OTHER,
        });
    }
}
