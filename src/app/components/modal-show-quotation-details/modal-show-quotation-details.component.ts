import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ModalShowQuotationDetailsService } from './modal-show-quotation-details.service';

@Component({
  selector: 'agt-modal-show-quotation-details',
  templateUrl: './modal-show-quotation-details.component.html',
  styles: [
  ]
})
export class ModalShowQuotationDetailsComponent implements OnChanges {
    @Input() modalId: string;
    @Input() contactId: string;
    @Input() quotationId: string;

    constructor(public modalShowQuotationDetailsService: ModalShowQuotationDetailsService) {
        this.modalId = '';
        this.contactId = '';
        this.quotationId = '';
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.quotationId.currentValue) {
            this.modalShowQuotationDetailsService.resetQuotation();
            this.modalShowQuotationDetailsService.loadQuotation(this.contactId, this.quotationId);
        }
    }

}
