import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CreatePolicyModalService {
    public createPolicyModal$ = new Subject<{
        contactId: string;
        contactType: number;
    }>();

    public openModal(data: { contactId: string; contactType: number }): void {
        this.createPolicyModal$.next(data);
    }
}
