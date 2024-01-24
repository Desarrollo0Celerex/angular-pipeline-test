import { Injectable } from '@angular/core';
import { CONTACT_ACTIONS } from '@contact/enums/contact-actions.enum';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ContactCategoryModalService {
    public contactCategoryModal$ = new Subject<CONTACT_ACTIONS>();

    public openModal(contactAction: CONTACT_ACTIONS): void {
        this.contactCategoryModal$.next(contactAction);
    }
}
