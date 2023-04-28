import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateQuotationDataSend } from '@interfaces/create-quotation-data-send.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { PolicyDetailsData } from '@interfaces/policy-details-data.interface';
import { QuotationService } from '@services/quotation.service';

@Injectable()
export class CreateQuotationService {

    constructor(private _quotationService: QuotationService) { }

    /**
     * Create a quotation
     * @param  contactId        The contact ID
     * @param  insuranceId      The insurance ID
     * @param  quotationData    The quotation Data
     * @return                  The quotation ID
     */
    createQuotation(contactId: string, insuranceId: number, quotationData: PolicyDetailsData): Observable<HttpResponse> {
        const requestBody: CreateQuotationDataSend = {
            insuranceId: insuranceId,
            insuranceTypeId: quotationData.insuranceTypeId,
            description: quotationData.description
        }
        return this._quotationService.createQuotation(contactId, requestBody);
    }
}
