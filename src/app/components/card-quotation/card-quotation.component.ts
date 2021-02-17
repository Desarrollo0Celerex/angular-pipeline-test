import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Quotation } from '@interfaces/quotation.interface';

@Component({
  selector: 'agt-card-quotation',
  templateUrl: './card-quotation.component.html',
  styles: [
  ]
})
export class CardQuotationComponent implements OnInit {
    @Input() quotation: Quotation | null;
    @Output() showQuotationDetails: EventEmitter<string>;

    constructor() {
        this.quotation = null;
        this.showQuotationDetails = new EventEmitter<string>();
    }

    ngOnInit(): void {
    }

    /**
     * Click event to show the quotation details
     */
    onClickShowDetails(): void {
        if(!!this.quotation) {
            this.showQuotationDetails.emit(this.quotation.quotationId);
        }
    }

}
