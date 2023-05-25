import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { TaskModalService } from '@core/services/task/task-modal.service';

@Component({
    selector: 'agt-modal-create-task',
    templateUrl: './modal-create-task.component.html',
    styles: [],
})
export class ModalCreateTaskComponent extends SmartComponent implements OnInit {
    modalId = 'agt-modal-create-task';

    constructor(private _taskModalService: TaskModalService) {
        super();
    }

    ngOnInit(): void {
        this._taskModalService.modalCreateTask
            .pipe(this.untilComponentDestroy())
            .subscribe((data) => {
                console.log(data);
            });
    }
}
