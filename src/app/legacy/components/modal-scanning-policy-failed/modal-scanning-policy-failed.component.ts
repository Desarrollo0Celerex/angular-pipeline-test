import { Component,Input } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-scanning-policy-failed',
  templateUrl: './modal-scanning-policy-failed.component.html',
  styles: [
  ]
})
export class ModalScanningPolicyFailedComponent {
    @Input() modalId: string = '';

    /**
     * Click event to close modal
     */
    onClickCloseModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
