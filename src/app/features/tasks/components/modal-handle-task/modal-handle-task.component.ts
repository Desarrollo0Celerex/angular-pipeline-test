import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { InitModalSelectCalendar } from '@features/tasks/interfaces/init-modal-select-calendar.interface';
import { ModuleService } from '@features/tasks/services/module.service';
import { TaskModalService } from '@features/tasks/services/task-modal.service';
declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-handle-task',
    templateUrl: './modal-handle-task.component.html',
    styles: [],
})
export class ModalHandleTaskComponent extends SmartComponent implements OnInit {
    modalId = 'agt-modal-handle-task';
    private _data: InitModalSelectCalendar | undefined = undefined;

    constructor(
        private _moduleService: ModuleService,
        private _taskModalService: TaskModalService
    ) {
        super();
    }

    ngOnInit(): void {
        this._moduleService.modalHandleTask$
            .pipe(this.untilComponentDestroy())
            .subscribe((data) => {
                this._data = data;
                this._showModal();
            });
    }

    showModalSelectCalendar(): void {
        this._taskModalService.showModalSelectCalendar(this._data!);
    }

    private _showModal(): void {
        ModalPlugin.show(this.modalId);
    }
}
