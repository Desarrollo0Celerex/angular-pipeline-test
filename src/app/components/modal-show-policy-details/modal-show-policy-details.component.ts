import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { ModalShowPolicyDetailsService } from './modal-show-policy-details.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-show-policy-details',
  templateUrl: './modal-show-policy-details.component.html',
  styles: [
  ]
})
export class ModalShowPolicyDetailsComponent implements OnChanges {
    @Input() contactId: string;
    @Input() isHistoryContent: boolean;
    @Input() modalId: string;
    @Input() policyId: string;
    @Output() showPolicy: EventEmitter<string>;

    constructor(
        public modalShowPolicyDetailsService: ModalShowPolicyDetailsService,
        private _router: Router
    ) {
        this.contactId = '';
        this.isHistoryContent = false;
        this.modalId = '';
        this.policyId = '';
        this.showPolicy = new EventEmitter<string>();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(((!!changes.contactId && changes.contactId.currentValue) && (!!changes.policyId && !!changes.policyId.currentValue) ) || (!!this.contactId && (!!changes.policyId && !!changes.policyId.currentValue) )) {
            this.modalShowPolicyDetailsService.resetPolicyDetails();
            this.modalShowPolicyDetailsService.loadPolicyDetails(this.contactId, this.policyId);
        }
    }

    /**
     * Click event to show policy
     */
    onClickShowPolicy(): void {
        ModalPlugin.hide(this.modalId);
        this.showPolicy.emit(this.policyId);
    }

    /**
     * Click event to navigate to the history policy
     */
    onClickShowHistoryPolicy(): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigateByUrl(ROUTES_NAME.showHistoryPolicy(this.contactId, this.policyId));
    }

}
