import { Component, Input } from '@angular/core';

@Component({
  selector: 'agt-modal-duplicate-group',
  templateUrl: './modal-duplicate-group.component.html',
  styles: [
  ]
})
export class ModalDuplicateGroupComponent {
    @Input() modalId: string = '';
}
