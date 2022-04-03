import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { POLICY_RECORD_TYPES } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Policy } from '@interfaces/policy.interface';
import { PolicyComplete } from '@interfaces/policy-complete.interface';
import { PolicyLog } from '@interfaces/policy-log.interface';
import { PolicyService } from '@services/policy.service';
import { PolicyLogService } from '@services/policy-log.service';

@Injectable()
export class ContainerPolicyDetailsService {
    policy: Policy | null = null;
    policyComplete: PolicyComplete | null = null;

    constructor(
        private _policyService: PolicyService,
        private _policyLogService: PolicyLogService
    ) { }

    loadPolicy(contactId: string, policyId: string): void {
        const fields: string = 'policyId,policyStatusId,policyStatusName,policyStatusBackground,policyStatusDescription,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,paymentPlanName,policyNumber,policyAmount,currencyName,totalAmount,coveredProperty,lifeTime,totalAmountPaid,bills,emissionDate,validityStartDate,validityEndDate,totalEndorsements,totalSinisters,insurerImageUrl,contactId,titularName,daysLeft,totalRenovations';
        this._policyService.getContactPolicy(contactId, policyId, fields).subscribe( (res: HttpResponse) => {
            this.policy = res.data;
            this.policyComplete = res.data;
        });
    }

    getPolicyLogs(contactId: string, policyId: string): Observable<PolicyLog[]> {
        const fields: string = 'sourceId';
        const filters: string = UtilitiesHelper.generateHttpFilter('policyRecordTypeId', [POLICY_RECORD_TYPES.RENEWED]);
        return this._policyLogService.getPolicyLogs(contactId, policyId, fields, filters);
    }

    deleteRenewedPolicy(contactId: string, policyId: string): Observable<void> {
        return this._policyService.deleteActivePolicy(contactId, policyId);
    }
}
