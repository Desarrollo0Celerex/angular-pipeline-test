import { Component, EventEmitter, Input, Output } from '@angular/core';
declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-select-task-action',
    templateUrl: './modal-select-task-action.component.html',
    styles: [],
})
export class ModalSelectTaskActionComponent {
    @Input() modalId = '';
    @Output() createTask = new EventEmitter<void>();

    requestCreateTask(): void {
        ModalPlugin.hide(this.modalId);
        this.createTask.emit();
    }
}
