import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PolicyRecordActionsModalService {
    public policyRecordActionsModal$ = new Subject<{
        contactId: string;
        policyId: string;
        paymentId: string;
    }>();

    public openModal(data: {
        contactId: string;
        policyId: string;
        paymentId: string;
    }): void {
        this.policyRecordActionsModal$.next(data);
    }
}
