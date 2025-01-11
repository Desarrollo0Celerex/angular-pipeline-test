import { Component, EventEmitter, Input, Output } from '@angular/core';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-duplicate-contact',
    templateUrl: './modal-duplicate-contact.component.html',
    styles: [],
    standalone: false
})
export class ModalDuplicateContactComponent {
    @Input() modalId: string;
    @Output() viewMatches: EventEmitter<void>;
    @Output() saveContact: EventEmitter<void>;

    constructor() {
        this.modalId = '';
        this.viewMatches = new EventEmitter<void>();
        this.saveContact = new EventEmitter<void>();
    }

    /**
     * Click event to request save contact
     */
    onClickSaveContact(): void {
        ModalPlugin.hide(this.modalId);
        this.saveContact.emit();
    }

    /**
     * Click event to request view matches
     */
    onClickViewMatches(): void {
        ModalPlugin.hide(this.modalId);
        this.viewMatches.emit();
    }

}
