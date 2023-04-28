import { Component, Input, Output, EventEmitter } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-upgrade-license',
  templateUrl: './modal-confirm-upgrade-license.component.html',
  styles: [
  ]
})
export class ModalConfirmUpgradeLicenseComponent {
    @Input() modalId: string = '';
    @Input() licenseName: string = '';
    @Output() actionConfirmed: EventEmitter<void> = new EventEmitter<void>();

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this.actionConfirmed.emit();
    }

}
