import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AMOUNT_INCREASE_TYPES } from '@constants/global';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-amount-increase',
  templateUrl: './modal-confirm-amount-increase.component.html',
  styles: [
  ]
})
export class ModalConfirmAmountIncreaseComponent {
    @Input() modalId: string;
    @Output() increaseTypeSelected: EventEmitter<number>;
    AMOUNT_INCREASE_TYPES: any;

    constructor() {
        this.modalId = '';
        this.increaseTypeSelected = new EventEmitter<number>();
        this.AMOUNT_INCREASE_TYPES = AMOUNT_INCREASE_TYPES;
    }

    /**
     * Click event to select the increase type
     * @param increaseType The increase type
     */
    onClickSelectIncreaseType(increaseType: number): void {
        ModalPlugin.hide(this.modalId);
        this.increaseTypeSelected.emit(increaseType);
    }

}
