import { Component, Input, Output, EventEmitter } from '@angular/core';

import { POLICY_INSURED_STATUS } from '@constants/global';
import { Insured } from '@interfaces/insured.interface';

import { PolicyInsuredData } from '@interfaces/policy-insured-data.interface';

@Component({
    selector: 'agt-card-policy-insured',
    templateUrl: './card-policy-insured.component.html',
    styles: [],
    standalone: false
})
export class CardPolicyInsuredComponent {
    @Input() insured: Insured | null = null;
    @Output() cancelInsured: EventEmitter<PolicyInsuredData> = new EventEmitter<PolicyInsuredData>();
    @Output() deleteInsured: EventEmitter<PolicyInsuredData> = new EventEmitter<PolicyInsuredData>();
    @Output() showInsuredFile: EventEmitter<string> = new EventEmitter<string>();
    @Output() showPolicyFile: EventEmitter<string> = new EventEmitter<string>();
    @Output() updateInsured: EventEmitter<PolicyInsuredData> = new EventEmitter<PolicyInsuredData>();
    POLICY_INSURED_STATUS: any = POLICY_INSURED_STATUS;

    _cancelInsured(): void {
        if(this.insured !== null) {
            this.cancelInsured.emit({
                contactId: this.insured.contactId,
                policyId: this.insured.policyId,
                policyInsuredId: this.insured.policyInsuredId
            });
        }
    }

    _deleteInsured(): void {
        if(this.insured !== null) {
            this.deleteInsured.emit({
                contactId: this.insured.contactId,
                policyId: this.insured.policyId,
                policyInsuredId: this.insured.policyInsuredId
            });
        }
    }

    _showInsuredFile(): void {
        if(this.insured !== null) {
            this.showInsuredFile.emit(this.insured.policyUrl);
        }
    }

    _showPolicyFile(): void {
        if(this.insured !== null) {
            this.showPolicyFile.emit(this.insured.fatherPolicyUrl);
        }
    }

    _updateInsured(): void {
        if(this.insured !== null) {
            this.updateInsured.emit({
                contactId: this.insured.contactId,
                policyId: this.insured.policyId,
                policyInsuredId: this.insured.policyInsuredId
            });
        }
    }

}
