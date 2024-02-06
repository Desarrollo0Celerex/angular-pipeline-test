import { Injectable } from '@angular/core';
import { POLICY_ACTIONS } from '@policy/enums/policy-actions';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SelectClientTypeModalService {
    public selectClientTypeModal$ = new Subject<{
        contactId: string;
        policyId: string;
        policyAction: POLICY_ACTIONS;
        modalData: {
            title: string;
            description: string;
        };
    }>();

    public openModal(data: {
        contactId: string;
        policyId: string;
        policyAction: POLICY_ACTIONS;
        modalData: {
            title: string;
            description: string;
        };
    }): void {
        this.selectClientTypeModal$.next(data);
    }
}
