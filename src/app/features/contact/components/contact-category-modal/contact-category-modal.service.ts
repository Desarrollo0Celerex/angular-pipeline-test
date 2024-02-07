import { Injectable } from '@angular/core';
import { CONTACT_ACTIONS } from '@contact/enums/contact-actions.enum';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ContactCategoryModalService {
    public contactCategoryModal$ = new Subject<{
        contactAction: CONTACT_ACTIONS;
        contactId?: string;
        policyId?: string;
    }>();

    public openModal(data: {
        contactAction: CONTACT_ACTIONS;
        contactId?: string;
        policyId?: string;
    }): void {
        this.contactCategoryModal$.next(data);
    }
}
