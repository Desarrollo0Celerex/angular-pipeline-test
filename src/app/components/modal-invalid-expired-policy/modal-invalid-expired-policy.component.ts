import { Component, Input } from '@angular/core';

@Component({
  selector: 'agt-modal-invalid-expired-policy',
  templateUrl: './modal-invalid-expired-policy.component.html',
  styles: [
  ]
})
export class ModalInvalidExpiredPolicyComponent {
    @Input() modalId: string = '';
}
