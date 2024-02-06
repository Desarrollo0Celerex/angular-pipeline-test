import { Injectable } from '@angular/core';
import { POLICY_ACTIONS } from '@policy/enums/policy-actions';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CreatePolicyModalService {
    public createPolicyModal$ = new Subject<{
        contactId: string;
        contactType?: number;
        policyAction?: POLICY_ACTIONS;
        oldPolicyId?: string;
        newContactId?: string;
    }>();

    public openModal(data: {
        contactId: string;
        contactType?: number;
        policyAction?: POLICY_ACTIONS;
        oldPolicyId?: string;
        newContactId?: string;
    }): void {
        this.createPolicyModal$.next(data);
    }
}
