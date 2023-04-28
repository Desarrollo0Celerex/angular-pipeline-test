import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ModalConfirmShowPaymentHistoryService {
    constructor(private _policyService: PolicyService) {}

    getPolicyPaymentId(
        contactId: string,
        policyId: string
    ): Observable<string> {
        const fields: string = 'paymentId';
        return this._policyService
            .getContactPolicy(contactId, policyId, fields)
            .pipe(
                map((res: HttpResponse) => {
                    return res.data.paymentId;
                })
            );
    }
}
