import { Component, Input, Output, EventEmitter } from '@angular/core';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-add-workspace-insurance',
    templateUrl: './modal-confirm-add-workspace-insurance.component.html',
    styles: [],
    standalone: false
})
export class ModalConfirmAddWorkspaceInsuranceComponent {
    @Input() modalId: string = '';
    @Output() actionConfirmed: EventEmitter<void> = new EventEmitter<void>();

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this.actionConfirmed.emit();
    }

}
