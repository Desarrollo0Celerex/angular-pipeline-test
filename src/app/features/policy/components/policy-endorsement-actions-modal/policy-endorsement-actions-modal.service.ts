import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PolicyEndorsementActionsModalService {
    public policyEndorsementActionsModal$ = new Subject<{
        contactId: string;
        policyId: string;
    }>();

    public openModal(data: { contactId: string; policyId: string }): void {
        this.policyEndorsementActionsModal$.next(data);
    }
}
