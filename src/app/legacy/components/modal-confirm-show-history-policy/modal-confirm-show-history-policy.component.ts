import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-show-history-policy',
    templateUrl: './modal-confirm-show-history-policy.component.html',
    styles: [],
    standalone: false
})
export class ModalConfirmShowHistoryPolicyComponent implements OnChanges {
    @Input() contactId: string;
    @Input() modalId: string;
    @Input() policyId: string;
    private _policyId: string = '';

    constructor(private _router: Router) {
        this.contactId = '';
        this.modalId = '';
        this.policyId = '';
    }


    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.policyId && !!changes.policyId.currentValue) {
            this._policyId = changes.policyId.currentValue;
        }
    }

    /**
     * click event to confirm show the history policy
     */
    onClickConfirmShowHistoryPolicy(): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigateByUrl(ROUTES_NAME.showHistoryPolicy(this.contactId, this._policyId));
    }

}
