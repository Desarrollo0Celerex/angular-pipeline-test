import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ModalShowPolicyService } from './modal-show-policy.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-show-policy',
    templateUrl: './modal-show-policy.component.html',
    styles: [],
})
export class ModalShowPolicyComponent implements OnChanges {
    @Input() contactId: string;
    @Input() modalId: string;
    @Input() policyId: string;
    policyUrl: string;

    constructor(public modalShowPolicyService: ModalShowPolicyService) {
        this.contactId = '';
        this.modalId = '';
        this.policyId = '';
        this.policyUrl = '';
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (
            (!!changes.contactId &&
                changes.contactId.currentValue &&
                !!changes.policyId &&
                !!changes.policyId.currentValue) ||
            (!!this.contactId &&
                !!changes.policyId &&
                !!changes.policyId.currentValue)
        ) {
            this.modalShowPolicyService.resetPolicyUrl();
            this.modalShowPolicyService.loadPolicyUrl(
                this.contactId,
                this.policyId
            );
        }
    }

    /**
     * Click event to close modal
     */
    onClickCloseModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
