import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PolicyPaymentActionsModalService {
    public policyPaymentActionsModal$ = new Subject<{
        contactId: string;
        policyId: string;
        paymentId: string;
    }>();

    public openModal(data: {
        contactId: string;
        policyId: string;
        paymentId: string;
    }): void {
        this.policyPaymentActionsModal$.next(data);
    }
}
