import { Injectable } from '@angular/core';
import { CONTACT_ACTIONS } from '@contact/enums/contact-actions.enum';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SelectClientTypeModalService {
    public selectClientTypeModal$ = new Subject<{
        contactId: string;
        policyId: string;
        contactAction: CONTACT_ACTIONS;
        modalData: {
            title: string;
            description: string;
        };
    }>();

    public openModal(data: {
        contactId: string;
        policyId: string;
        contactAction: CONTACT_ACTIONS;
        modalData: {
            title: string;
            description: string;
        };
    }): void {
        this.selectClientTypeModal$.next(data);
    }
}
