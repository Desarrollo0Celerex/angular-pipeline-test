import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PolicySinisterActionsModalService {
    public policySinisterActionsModal$ = new Subject<{
        contactId: string;
        policyId: string;
        policyInsuranceId: number;
    }>();

    public openModal(data: {
        contactId: string;
        policyId: string;
        policyInsuranceId: number;
    }): void {
        this.policySinisterActionsModal$.next(data);
    }
}
