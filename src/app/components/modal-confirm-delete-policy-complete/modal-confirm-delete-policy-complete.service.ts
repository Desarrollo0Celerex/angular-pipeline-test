import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PolicyService } from '@services/policy.service';

@Injectable()
export class ModalConfirmDeletePolicyCompleteService {

    constructor(private _policyService: PolicyService) { }

    /**
     * Delete the contact policy
     * @param  contactId The contact ID
     * @param  policyId  The policy ID to delete
     * @return           Notice of action done
     */
    deleteContactPolicy(contactId: string, policyId: string): Observable<void> {
        return this._policyService.deleteContactCompletePolicy(contactId, policyId);
    }
}
