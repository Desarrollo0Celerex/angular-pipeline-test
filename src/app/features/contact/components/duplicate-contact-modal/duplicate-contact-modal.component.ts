import { Component, EventEmitter, Output } from '@angular/core';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-duplicate-contact-modal',
    templateUrl: './duplicate-contact-modal.component.html',
    styles: [],
})
export class DuplicateContactModalComponent {
    @Output() viewMatches = new EventEmitter<void>();
    @Output() createDuplicateContact = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();
    modalId = 'agt-duplicate-contact-modal';

    openModal(): void {
        ModalPlugin.show(this.modalId);
    }

    cancelAction(): void {
        this._closeModal();
        this.cancel.emit();
    }

    requestViewMatches(): void {
        this._closeModal();
        this.viewMatches.emit();
    }

    requestCreateDuplicateContact(): void {
        this._closeModal();
        this.createDuplicateContact.emit();
    }

    private _closeModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
