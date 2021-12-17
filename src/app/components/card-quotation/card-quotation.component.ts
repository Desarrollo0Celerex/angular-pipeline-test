import { Component, EventEmitter, Input, Output } from '@angular/core';

import { QUOTATION_STATUS } from '@constants/global';
import { ContactQuotation } from '@interfaces/contact-quotation.interface';
import { Quotation } from '@interfaces/quotation.interface';

@Component({
  selector: 'agt-card-quotation',
  templateUrl: './card-quotation.component.html',
  styles: [
  ]
})
export class CardQuotationComponent {
    @Input() quotation: Quotation | null;
    @Output() showQuotationDetails: EventEmitter<ContactQuotation>;
    @Output() acceptQuotation: EventEmitter<ContactQuotation>;
    @Output() rejectQuotation: EventEmitter<ContactQuotation>;
    QUOTATION_STATUS: any;

    constructor() {
        this.quotation = null;
        this.showQuotationDetails = new EventEmitter<ContactQuotation>();
        this.acceptQuotation = new EventEmitter<ContactQuotation>();
        this.rejectQuotation = new EventEmitter<ContactQuotation>();
        this.QUOTATION_STATUS = QUOTATION_STATUS;
    }

    /**
     * Click event to accept a quotation
     */
    onClickAcceptQuotation(): void {
        if(!!this.quotation) {
            this.acceptQuotation.emit({
                contactId: this.quotation.contactId,
                quotationId: this.quotation.quotationId
            });
        }
    }

    /**
     * Click event to reject a quotation
     */
    onClickRejectQuotation(): void {
        if(!!this.quotation) {
            this.rejectQuotation.emit({
                contactId: this.quotation.contactId,
                quotationId: this.quotation.quotationId
            });
        }
    }

    /**
     * Click event to show the quotation details
     */
    onClickShowDetails(): void {
        if(!!this.quotation) {
            this.showQuotationDetails.emit({
                contactId: this.quotation.contactId,
                quotationId: this.quotation.quotationId
            });
        }
    }

}
