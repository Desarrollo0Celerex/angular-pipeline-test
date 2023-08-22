import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { AlertHelper } from '@core/helpers/alert.helper';
import { ModalHelper } from '@core/helpers/modal.helper';
import { ModuleService } from '@features/tasks/services/module.service';
import { TaskService } from '@features/tasks/services/task.service';

@Component({
    selector: 'agt-modal-confirm-delete-task',
    templateUrl: './modal-confirm-delete-task.component.html',
    styles: [],
})
export class ModalConfirmDeleteTaskComponent
    extends SmartComponent
    implements OnInit
{
    modalId = 'agt-modal-confirm-delete-task';
    private _taskId = '';

    constructor(
        private _moduleService: ModuleService,
        private _taskService: TaskService
    ) {
        super();
    }

    ngOnInit(): void {
        this._moduleService.modalConfirmDeleteTask$
            .pipe(this.untilComponentDestroy())
            .subscribe((taskId) => {
                this._taskId = taskId;
                ModalHelper.show(this.modalId);
            });
    }

    deleteTask(): void {
        this._taskService.deleteTask(this._taskId).subscribe(() => {
            this._moduleService.requestReloadContent();
            AlertHelper.taskDeleted();
        });
    }
}
