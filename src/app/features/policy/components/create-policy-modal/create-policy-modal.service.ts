import { Injectable } from '@angular/core';
import { CONTACT_ACTIONS } from '@contact/enums/contact-actions.enum';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CreatePolicyModalService {
    public createPolicyModal$ = new Subject<{
        contactId: string;
        contactAction: CONTACT_ACTIONS;
        contactType?: number;
        oldPolicyId?: string;
        newContactId?: string;
    }>();

    public openModal(data: {
        contactId: string;
        contactAction: CONTACT_ACTIONS;
        contactType?: number;
        oldPolicyId?: string;
        newContactId?: string;
    }): void {
        this.createPolicyModal$.next(data);
    }
}
