import { Component, Input } from '@angular/core';

@Component({
  selector: 'agt-modal-incomplete-contact-data',
  templateUrl: './modal-incomplete-contact-data.component.html',
  styles: [
  ]
})
export class ModalIncompleteContactDataComponent{
    @Input() modalId: string;

    constructor() {
        this.modalId = '';
    }

}
