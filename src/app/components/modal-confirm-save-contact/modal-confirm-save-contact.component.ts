import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-save-contact',
  templateUrl: './modal-confirm-save-contact.component.html',
  styles: [
  ]
})
export class ModalConfirmSaveContactComponent implements OnInit {
    @Input() modalId: string;
    @Output() saveContact: EventEmitter<void>;

    constructor() {
        this.modalId = '';
        this.saveContact = new EventEmitter<void>();
    }

    ngOnInit(): void {
    }

    /**
     * Click event to save contact
     */
    onClickSaveContact(): void {
        ModalPlugin.hide(this.modalId);
        this.saveContact.emit();
    }

}
