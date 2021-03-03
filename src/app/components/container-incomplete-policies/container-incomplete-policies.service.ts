import { Injectable } from '@angular/core';

import { HttpResponse } from '@interfaces/http-response.interface';
import { PolicyPreview } from '@interfaces/policy-preview.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ContainerIncompletePoliciesService {
    incompletePolicies: PolicyPreview[];

    constructor(private _policyService: PolicyService) {
        this.incompletePolicies = [];
    }

    /**
     * Load the incomplete policies
     * @param contactId The contact ID
     * @param page      The page number
     */
    loadIncompletePolicies(contactId: string, page: number, contentSubtype: number): void {
        const fields: string = 'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusName,policyStatusDescription,policyStatusBackground';
        const filters: number [] = [contentSubtype];
        this._policyService.getContactPolicies(contactId, page, fields, filters).subscribe( (res: HttpResponse) => {
            this.incompletePolicies = res.data.items;
        })
    }
}
