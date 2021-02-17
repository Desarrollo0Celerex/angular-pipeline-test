import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpResponse } from '@interfaces/http-response.interface';
import { QuotationService } from '@services/quotation.service';

@Injectable()
export class ModalAcceptQuotationService {

    constructor(private _quotationService: QuotationService) { }

    /**
     * Accept the quotation
     * @param  contactId   The contact ID
     * @param  quotationId The quotation ID to accept
     * @return             The policy ID
     */
    acceptQuotation(contactId: string, quotationId: string): Observable<HttpResponse> {
        return this._quotationService.acceptContactQuotation(contactId, quotationId);
    }
}
