import { Injectable } from '@angular/core';

import { POLICY_STATUS, EXTERNAL_POLICY_STATUS } from '@constants/global';

import { HttpResponse } from '@interfaces/http-response.interface';
import { ExternalPolicy } from '@interfaces/external-policy.interface';
import { ExternalPolicyService } from '@services/external-policy.service';

@Injectable()
export class ContainerExternalPoliciesService {
    externalPolicies: ExternalPolicy[] = [];

    constructor(private _externalPolicyService: ExternalPolicyService) { }

    loadContactExternalPolicies(contactId: string, policyStatusId: number): void {
        const externalPolicyStatusId: number[] = this._getExternalPolicyStatusId(policyStatusId);
        const fields: string = 'externalPolicyId,isChecked,policyUrl,coveredProperty,validityStartDate,validityEndDate,policyAmount,policyNumber,insurerImageUrl,insuranceName,insuranceIcon,insuranceBackground,paymentMethodName,insuranceTypeName,currencyName,externalPolicyStatusId,externalPolicyStatusName,externalPolicyStatusDescription,lifeTime,contactId';
        this._externalPolicyService.getContactExternalPolicies(contactId, fields, externalPolicyStatusId).subscribe((res: HttpResponse) => {
            this.externalPolicies = res.data.items;
        })
    }


    loadGroupExternalPolicies(groupId: string, policyStatusId: number): void {
        const externalPolicyStatusId: number[] = this._getExternalPolicyStatusId(policyStatusId);
        const fields: string = 'externalPolicyId,isChecked,policyUrl,coveredProperty,validityStartDate,validityEndDate,policyAmount,policyNumber,insurerImageUrl,insuranceName,insuranceIcon,insuranceBackground,paymentMethodName,insuranceTypeName,currencyName,externalPolicyStatusId,externalPolicyStatusName,externalPolicyStatusDescription,lifeTime,contactId';
        this._externalPolicyService.getGroupExternalPolicies(groupId, fields, externalPolicyStatusId).subscribe((res: HttpResponse) => {
            this.externalPolicies = res.data.items;
        })
    }

    private _getExternalPolicyStatusId(policyStatusId: number): number[] {
        let externalPolicyStatusId: number[];
        switch(policyStatusId) {
            case POLICY_STATUS.INCOMPLETE:
                externalPolicyStatusId = [EXTERNAL_POLICY_STATUS.INCOMPLETE];
            break;

            case POLICY_STATUS.FINISHED:
                externalPolicyStatusId = [EXTERNAL_POLICY_STATUS.EXPIRED];
            break;

            case POLICY_STATUS.CANCELLED:
                externalPolicyStatusId = [EXTERNAL_POLICY_STATUS.CANCELLED];
            break;

            default:
                externalPolicyStatusId = [EXTERNAL_POLICY_STATUS.CURRENT, EXTERNAL_POLICY_STATUS.INCOMPLETE];
        }
        return externalPolicyStatusId;
    }
}
