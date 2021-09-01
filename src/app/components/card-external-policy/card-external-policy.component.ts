import { Component, EventEmitter, Input, Output } from '@angular/core';

import { EXTERNAL_POLICY_STATUS } from '@constants/global';
import { ExternalPolicy } from '@interfaces/external-policy.interface';

@Component({
  selector: 'agt-card-external-policy',
  templateUrl: './card-external-policy.component.html',
  styles: [
  ]
})
export class CardExternalPolicyComponent {
    @Input() externalPolicy: ExternalPolicy | null = null;
    @Output() showExternalPolicy: EventEmitter<string> = new EventEmitter<string>();
    @Output() confirmValidateExternalPolicy: EventEmitter<string> = new EventEmitter<string>();
    @Output() confirmUpdateExternalPolicy: EventEmitter<string> = new EventEmitter<string>();
    externalPolicyStatusCancelled: number = EXTERNAL_POLICY_STATUS.CANCELLED;

    _confirmUpdatePolicy(): void {
        if(!!this.externalPolicy) {
            if(!!this.externalPolicy.isChecked) {
                this.confirmUpdateExternalPolicy.emit(this.externalPolicy.externalPolicyId);
            } else {
                this.confirmValidateExternalPolicy.emit(this.externalPolicy.externalPolicyId);
            }
        }
    }

    _showExternalPolicy(): void {
        if(!!this.externalPolicy) this.showExternalPolicy.emit(this.externalPolicy.policyUrl)
    }
}
