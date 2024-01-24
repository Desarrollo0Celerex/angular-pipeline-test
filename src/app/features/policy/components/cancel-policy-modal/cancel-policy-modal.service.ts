import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class CancelPolicyModalService {
    public cancelPolicyModal$ = new Subject<{
        contactId: string;
        policyId: string;
    }>();

    public openModal(data: { contactId: string; policyId: string }): void {
        this.cancelPolicyModal$.next(data);
    }
}
