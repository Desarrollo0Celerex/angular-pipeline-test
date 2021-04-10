import { Component, Input } from '@angular/core';

@Component({
  selector: 'agt-modal-scanning-policy',
  templateUrl: './modal-scanning-policy.component.html',
  styles: [
  ]
})
export class ModalScanningPolicyComponent {
    @Input() modalId: string = '';
}
