import { Component, Input } from '@angular/core';

@Component({
  selector: 'agt-modal-duplicate-partner',
  templateUrl: './modal-duplicate-partner.component.html',
  styles: [
  ]
})
export class ModalDuplicatePartnerComponent {
    @Input() modalId: string = '';
}
