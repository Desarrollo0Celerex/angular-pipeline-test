import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { HttpResponse } from '@interfaces/http-response.interface';
import { Policy } from '@interfaces/policy.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class CompletePolicyService {
    policy: Policy;

    constructor(private _policyService: PolicyService) {
        this.policy = this._buildContactPolicy();
    }

    /**
     * Load the contact policy
     * @param contactId The contact ID
     * @param policyId  The policy ID
     * @return          Notice of action done
     */
    loadContactPolicy(contactId: string, policyId: string): Observable<void> {
        this.policy = this._buildContactPolicy();
        const fields: string = 'policyId,insuranceName,insuranceIcon,insuranceBackground,policyStatusName,policyStatusBackground,insuranceTypeName,insurerName,policyUrl';
        return this._policyService.getContactPolicy(contactId, policyId).pipe(
            tap(( res: HttpResponse) => {
                this.policy = res.data;
            }),
            map( () => { })
        )
    }

    /**
     * Build the contact policy
     * @return An empty contact policy
     */
    private _buildContactPolicy(): Policy {
        return {
            policyId: '',
            insuranceName: '',
            insuranceIcon: '',
            insuranceBackground: '',
            policyStatusName: '',
            policyStatusBackground: '',
            insuranceTypeName: '',
            insurerName: '',
            policyUrl: ''
        }
    }
}
