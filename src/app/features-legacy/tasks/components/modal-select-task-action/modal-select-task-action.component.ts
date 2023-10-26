import { Component, OnInit, ViewChild } from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { TASK_MODULES } from '@core/constants/settings';
import { ModuleService } from '@features-legacy/tasks/services/module.service';
import { CreateTaskComponent } from '@tasks/components/create-task/create-task.component';
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
    @ViewChild(CreateTaskComponent)
    createTaskComponent!: CreateTaskComponent;
    modalId = 'agt-modal-select-task-action';

    constructor(private _moduleService: ModuleService) {
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
}
