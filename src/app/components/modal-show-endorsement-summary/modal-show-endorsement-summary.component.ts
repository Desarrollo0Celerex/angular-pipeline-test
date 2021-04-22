import { Component, EventEmitter, Input, Output } from '@angular/core';

declare var ModalPlugin: any;
@Component({
  selector: 'agt-modal-show-endorsement-summary',
  templateUrl: './modal-show-endorsement-summary.component.html',
  styles: [
  ]
})
export class ModalShowEndorsementSummaryComponent {
    @Input() currencyName: string = "";
    @Input() fractionalReceiptAmount: number = 0;
    @Input() modalId: string = "";
    @Input() newAmount: number = 0;
    @Input() policyAmount: number = 0;
    @Output() endorsementApplicationConfirmed: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Click event to confirm the application of endorsement
     */
    onClickConfirm(): void {
        ModalPlugin.hide(this.modalId);
        this.endorsementApplicationConfirmed.emit();
    }

}
