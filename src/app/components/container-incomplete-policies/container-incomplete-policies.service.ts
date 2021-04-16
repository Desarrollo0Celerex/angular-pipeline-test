import { Injectable } from '@angular/core';

import { HttpResponse } from '@interfaces/http-response.interface';
import { Policy } from '@interfaces/policy.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ContainerIncompletePoliciesService {
    incompletePolicies: Policy[];

    constructor(private _policyService: PolicyService) {
        this.incompletePolicies = [];
    }

    /**
     * Delete the policy card
     * @param policyId The policy ID to delete
     */
    deletePolicyCard(policyId: string): void {
        const policyPosition: number = this._getPolicyPosition(policyId);
        if(policyPosition > -1) {
            this.incompletePolicies.splice(policyPosition, 1);
        }
    }

    /**
     * Load the incomplete policies
     * @param contactId The contact ID
     * @param page      The page number
     */
    loadIncompletePolicies(contactId: string, page: number, contentSubtype: number): void {
        const fields: string = 'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusId,policyStatusName,policyStatusDescription,policyStatusBackground,policyAmount';
        const filters: number [] = [contentSubtype];
        this._policyService.getContactPolicies(contactId, page, fields, filters).subscribe( (res: HttpResponse) => {
            this.incompletePolicies = res.data.items;
        })
    }

    /**
     * Get the policy position
     * @param  policyId The policy ID to search
     * @return          The policy position found
     */
    private _getPolicyPosition(policyId: string): number {
        return this.incompletePolicies.findIndex((value: Policy) => value.policyId == policyId)
    }
}
