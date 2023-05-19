import { Component, EventEmitter, Input, Output } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-scanning-policy-success',
  templateUrl: './modal-scanning-policy-success.component.html',
  styles: [
  ]
})
export class ModalScanningPolicySuccessComponent {
    @Input() modalId: string = '';
    @Output() loadScannedPolicyData: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Click event to confirm details
     */
    onClickValidDetails(): void {
        ModalPlugin.hide(this.modalId);
        this.loadScannedPolicyData.emit();
    }

}
