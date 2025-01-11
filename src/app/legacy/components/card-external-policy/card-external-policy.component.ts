import { Component, EventEmitter, Input, Output } from '@angular/core';

import { EXTERNAL_POLICY_STATUS } from '@constants/global';
import { ContactPolicyData } from '@interfaces/contact-policy-data.interface';
import { ExternalPolicy } from '@interfaces/external-policy.interface';

@Component({
    selector: 'agt-card-external-policy',
    templateUrl: './card-external-policy.component.html',
    styles: [],
    standalone: false
})
export class CardExternalPolicyComponent {
    @Input() externalPolicy: ExternalPolicy | null = null;
    @Output() showExternalPolicy: EventEmitter<string> = new EventEmitter<string>();
    @Output() confirmValidateExternalPolicy: EventEmitter<ContactPolicyData> = new EventEmitter<ContactPolicyData>();
    @Output() confirmUpdateExternalPolicy: EventEmitter<ContactPolicyData> = new EventEmitter<ContactPolicyData>();
    @Output() showExternalPolicyDetails: EventEmitter<ContactPolicyData> = new EventEmitter<ContactPolicyData>();
    externalPolicyStatusCancelled: number = EXTERNAL_POLICY_STATUS.CANCELLED;

    _confirmUpdatePolicy(): void {
        if(!!this.externalPolicy) {
            if(!!this.externalPolicy.isChecked) {
                this.confirmUpdateExternalPolicy.emit({
                    contactId: this.externalPolicy.contactId,
                    policyId: this.externalPolicy.externalPolicyId
                });
            } else {
                this.confirmValidateExternalPolicy.emit({
                    contactId: this.externalPolicy.contactId,
                    policyId: this.externalPolicy.externalPolicyId
                });
            }
        }
    }

    onClickShowExternalPolicy(): void {
        if(!!this.externalPolicy) this.showExternalPolicy.emit(this.externalPolicy.policyUrl)
    }

    onClickShowExternalPolicyDetails(): void {
        if(!!this.externalPolicy) {
            this.showExternalPolicyDetails.emit({
                contactId: this.externalPolicy.contactId,
                policyId: this.externalPolicy.externalPolicyId
            });
        }
    }

}
