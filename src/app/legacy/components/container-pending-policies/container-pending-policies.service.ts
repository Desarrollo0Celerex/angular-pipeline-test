import { Injectable } from '@angular/core';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { Policy } from '@core/interfaces/policy.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ContainerPendingPoliciesService {
    pendingPolicies: Policy[];

    constructor(private _policyService: PolicyService) {
        this.pendingPolicies = [];
    }

    loadContactPendingPolicies(
        contactId: string,
        page: number,
        contentSubtype: number
    ): void {
        const fields: string =
            'policyId,insuranceId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusId,policyStatusName,policyStatusDescription,policyStatusBackground,policyAmount,policyNumber,paymentPlanName,contactId,insurerImageUrl,policyUrl,currencyName,coveredProperty,paymentId';
        const filters: number[] = [contentSubtype];
        this._policyService
            .getContactPolicies(contactId, page, fields, filters)
            .subscribe((res: HttpResponse) => {
                this.pendingPolicies = res.data.items;
            });
    }

    loadGroupPendingPolicies(
        groupId: string,
        page: number,
        contentSubtype: number
    ): void {
        const fields: string =
            'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusId,policyStatusName,policyStatusDescription,policyStatusBackground,policyAmount,policyNumber,paymentPlanName,contactId,insurerImageUrl,policyUrl,currencyName,coveredProperty,paymentId';
        const filters: number[] = [contentSubtype];
        this._policyService
            .getGroupPolicies(groupId, page, fields, filters)
            .subscribe((res: HttpResponse) => {
                this.pendingPolicies = res.data.items;
            });
    }

    loadPartnerPendingPolicies(
        partnerId: string,
        page: number,
        contentSubtype: number
    ): void {
        const fields: string =
            'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusId,policyStatusName,policyStatusDescription,policyStatusBackground,policyAmount,policyNumber,paymentPlanName,contactId,insurerImageUrl,policyUrl,currencyName,coveredProperty,paymentId';
        const filters: number[] = [contentSubtype];
        this._policyService
            .getPartnerPolicies(partnerId, page, fields, filters)
            .subscribe((res: HttpResponse) => {
                this.pendingPolicies = res.data.items;
            });
    }
}
