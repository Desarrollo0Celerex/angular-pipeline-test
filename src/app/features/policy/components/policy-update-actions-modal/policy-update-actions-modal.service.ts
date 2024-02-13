import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PolicyUpdateActionsModalService {
    public policyUpdateActionsModal$ = new Subject<{
        contactId: string;
        policyId: string;
    }>();

    public openModal(data: { contactId: string; policyId: string }): void {
        this.policyUpdateActionsModal$.next(data);
    }
}
