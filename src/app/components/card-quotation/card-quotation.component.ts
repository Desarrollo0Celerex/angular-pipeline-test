import { Component, EventEmitter, Input, Output } from '@angular/core';

import { QUOTATION_STATUS } from '@constants/global';
import { Quotation } from '@interfaces/quotation.interface';

@Component({
  selector: 'agt-card-quotation',
  templateUrl: './card-quotation.component.html',
  styles: [
  ]
})
export class CardQuotationComponent {
    @Input() quotation: Quotation | null;
    @Output() showQuotationDetails: EventEmitter<string>;
    @Output() acceptQuotation: EventEmitter<string>;
    QUOTATION_STATUS: any;

    constructor() {
        this.quotation = null;
        this.showQuotationDetails = new EventEmitter<string>();
        this.acceptQuotation = new EventEmitter<string>();
        this.QUOTATION_STATUS = QUOTATION_STATUS;
    }

    /**
     * Click event to show the quotation details
     */
    onClickAcceptQuotation(): void {
        if(!!this.quotation) {
            this.acceptQuotation.emit(this.quotation.quotationId);
        }
    }

    onClickShowDetails(): void {
        if(!!this.quotation) {
            this.showQuotationDetails.emit(this.quotation.quotationId);
        }
    }

}
