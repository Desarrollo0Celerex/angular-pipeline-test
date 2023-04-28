import { Component, Input, Output, EventEmitter } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-update-site',
  templateUrl: './modal-confirm-update-site.component.html',
  styles: [
  ]
})
export class ModalConfirmUpdateSiteComponent {
    @Input() modalId: string = '';
    @Output() actionConfirmed: EventEmitter<void> = new EventEmitter<void>();

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this.actionConfirmed.emit();
    }

}
