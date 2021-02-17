import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { QuotationService } from '@services/quotation.service';

@Injectable()
export class ModalConfirmRejectQuotationService {

    constructor(private _quotationService: QuotationService) { }

    /**
     * Reject the quotation
     * @param  contactId   The contact ID
     * @param  quotationId The quotation ID to reject
     * @return             Notice of action done
     */
    rejectQuotation(contactId: string, quotationId: string): Observable<void> {
        return this._quotationService.rejectContactQuotation(contactId, quotationId);
    }
}
