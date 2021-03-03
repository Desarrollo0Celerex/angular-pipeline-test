import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

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
    @Input() modalId: string;
    @Input() policyId: string;
    @Output() showPolicy: EventEmitter<string>;

    constructor(public modalShowPolicyDetailsService: ModalShowPolicyDetailsService) {
        this.contactId = '';
        this.modalId = '';
        this.policyId = '';
        this.showPolicy = new EventEmitter<string>();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.policyId.currentValue) {
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

}
