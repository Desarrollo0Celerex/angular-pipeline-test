import { Component, Input, Output, EventEmitter } from '@angular/core';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-import-failed',
    templateUrl: './modal-import-failed.component.html',
    styles: [],
    standalone: false
})
export class ModalImportFailedComponent {
    @Input() modalId: string = '';
    @Output() actionConfirmed: EventEmitter<void> = new EventEmitter<void>();

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this.actionConfirmed.emit();
    }
}
