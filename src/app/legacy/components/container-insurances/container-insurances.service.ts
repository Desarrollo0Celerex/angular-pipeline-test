import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CreatePolicyData } from '@interfaces/create-policy-data.interface';
import { CreateQuotationDataSend } from '@interfaces/create-quotation-data-send.interface';
import { PolicyDetailsData } from '@interfaces/policy-details-data.interface';
import { PolicyService } from '@services/policy.service';
import { QuotationService } from '@services/quotation.service';

@Injectable()
export class ContainerInsurancesService {

    constructor(
        private _policyService: PolicyService,
        private _quotationService: QuotationService
    ) { }

    createPolicy(contactId: string, insuranceId: number, insuranceTypeId: number): Observable<string> {
        const requestBody: CreatePolicyData = { insuranceId, insuranceTypeId }
        return this._policyService.createPolicy(contactId, requestBody);
    }

    createQuotation(contactId: string, insuranceId: number, quotationData: PolicyDetailsData): Observable<void> {
        const requestBody: CreateQuotationDataSend = {
            insuranceId: insuranceId,
            insuranceTypeId: quotationData.insuranceTypeId,
            description: quotationData.description
        }
        return this._quotationService.createQuotation(contactId, requestBody).pipe(
            map(() => { })
        );
    }
}
