import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PolicyRenewalActionsModalService {
    public policyRenewalActionsModal$ = new Subject<{
        contactId: string;
        policyId: string;
    }>();

    public openModal(data: { contactId: string; policyId: string }): void {
        this.policyRenewalActionsModal$.next(data);
    }
}
