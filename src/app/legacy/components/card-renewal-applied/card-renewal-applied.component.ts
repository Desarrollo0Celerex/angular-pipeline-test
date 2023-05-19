import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ContactPolicyData } from '@interfaces/contact-policy-data.interface';
import { Renewal } from '@interfaces/renewal.interface';

@Component({
  selector: 'agt-card-renewal-applied',
  templateUrl: './card-renewal-applied.component.html',
  styles: [
  ]
})
export class CardRenewalAppliedComponent {
    @Input() renewal: Renewal | null = null;
    @Output() showPolicy: EventEmitter<ContactPolicyData> = new EventEmitter<ContactPolicyData>();
    @Output() showPolicyDetails: EventEmitter<ContactPolicyData> = new EventEmitter<ContactPolicyData>();
    
    onShowPolicy(): void {
        if(this.renewal !== null) {
            this.showPolicy.emit({
              contactId: this.renewal.contactId,
              policyId: this.renewal.policyId,
            })
        }
    }

    onShowPolicyDetails(): void {
        if(this.renewal !== null) {
            this.showPolicyDetails.emit({
              contactId: this.renewal.contactId,
              policyId: this.renewal.policyId,
            })
        }
    }
}
