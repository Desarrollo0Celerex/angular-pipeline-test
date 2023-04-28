import { Component, Input, Output, EventEmitter } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-select-contact-action',
  templateUrl: './modal-select-contact-action.component.html',
  styles: [
  ]
})
export class ModalSelectContactActionComponent {
    @Input() modalId: string = '';
    @Input() title: string = '';
    @Input() description: string = '';
    @Output() createContact: EventEmitter<void> = new EventEmitter<void>();
    @Output() searchContact: EventEmitter<void> = new EventEmitter<void>();

    doActionCreateContact(): void {
        ModalPlugin.hide(this.modalId);
        this.createContact.emit();
    }

    doActionSearchContact(): void {
        ModalPlugin.hide(this.modalId);
        this.searchContact.emit();
    }

}
