import { Injectable } from '@angular/core';

import { HttpResponse } from '@interfaces/http-response.interface';
import { Quotation } from '@interfaces/quotation.interface';
import { QuotationService } from '@services/quotation.service';

@Injectable()
export class ModalShowQuotationDetailsService {
    quotation: Quotation;

    constructor(private _quotationService: QuotationService) {
        this.quotation = this._buildQuotation();
    }

    /**
     * Load the quotation data
     * @param  quotationId The quotation ID to load
     */
    loadQuotation(contactId: string, quotationId: string): void {
        const fields: string = 'description,insuranceName,insuranceTypeName,createdAt,createdByName';
        this._quotationService.getContactQuotation(contactId, quotationId, fields).subscribe( (res: HttpResponse) => {
            this.quotation = res.data;
        })
    }

    /**
     * Reset the quotation data
     */
    resetQuotation(): void {
        this.quotation = this._buildQuotation();
    }

    /**
     * Build the quotation data
     * @return The quotation data
     */
    private _buildQuotation(): Quotation {
        return {
            quotationId: '',
            description: '',
            createdAt: '',
            insuranceName: '',
            insuranceIcon: '',
            insuranceBackground: '',
            quotationStatusId: 0,
            quotationStatusName: '',
            quotationStatusBackground: '',
            insuranceTypeName: '',
            createdByName: ''
        }
    }
}
