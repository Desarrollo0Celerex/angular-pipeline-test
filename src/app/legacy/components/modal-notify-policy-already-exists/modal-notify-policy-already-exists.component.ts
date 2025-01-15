import { Component, Input, Output, EventEmitter } from '@angular/core';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-notify-policy-already-exists',
    templateUrl: './modal-notify-policy-already-exists.component.html',
    styles: [],
    standalone: false
})
export class ModalNotifyPolicyAlreadyExistsComponent {
    @Input() modalId: string = '';
    @Output() actionConfirmed: EventEmitter<void> = new EventEmitter<void>();

    constructor() { }

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this.actionConfirmed.emit();
    }

}
