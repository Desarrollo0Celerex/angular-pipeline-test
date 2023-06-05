import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { ModalHelper } from '@core/helpers/modal.helper';
import { ModuleService } from '@features/tasks/services/module.service';
import { TaskModalService } from '@features/tasks/services/task-modal.service';

@Component({
    selector: 'agt-modal-handle-task',
    templateUrl: './modal-handle-task.component.html',
    styles: [],
})
export class ModalHandleTaskComponent extends SmartComponent implements OnInit {
    modalId = 'agt-modal-handle-task';
    private _taskId = '';

    constructor(
        private _moduleService: ModuleService,
        private _taskModalService: TaskModalService
    ) {
        super();
    }

    ngOnInit(): void {
        this._moduleService.modalHandleTask$
            .pipe(this.untilComponentDestroy())
            .subscribe((taskId) => {
                this._taskId = taskId;
                ModalHelper.showModal(this.modalId);
            });
    }

    showModalEditTask(): void {
        this._moduleService.showModalEditTask(this._taskId);
    }

    showModalSelectCalendar(): void {
        this._taskModalService.showModalSelectCalendar(this._taskId);
    }

    showModalSelectChannels(): void {
        this._moduleService.showModalSelectChannels(this._taskId);
    }
}
