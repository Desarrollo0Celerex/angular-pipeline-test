import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { POLICY_RECORD_TYPES } from '@constants/global';
import { PolicyRecord } from '@interfaces/policy-record.interface';
import { PolicyRecordData } from '@interfaces/policy-record-data.interface';

@Component({
  selector: 'agt-card-policy-record',
  templateUrl: './card-policy-record.component.html',
  styles: [
  ]
})
export class CardPolicyRecordComponent implements OnInit {
    @Input() policyRecord: PolicyRecord | null = null;
    @Output() completePolicy: EventEmitter<PolicyRecordData> = new EventEmitter<PolicyRecordData>();
    @Output() showEndorsement: EventEmitter<PolicyRecordData> = new EventEmitter<PolicyRecordData>();
    @Output() showPolicy: EventEmitter<PolicyRecordData> = new EventEmitter<PolicyRecordData>();
    @Output() showPolicyDetails: EventEmitter<PolicyRecordData> = new EventEmitter<PolicyRecordData>();
    POLICY_RECORD_TYPES: any = POLICY_RECORD_TYPES;

    constructor() { }

    ngOnInit(): void {
        this._updatePolicyRecordTypeDescription();
    }

    /**
     * Click event to complete the policy
     */
    onClickCompletePolicy(): void {
        if(!!this.policyRecord) {
            const policyRecordData: PolicyRecordData = {
                sourceId: this.policyRecord.sourceId,
                sourceContactId: this.policyRecord.sourceContactId,
            }
            this.completePolicy.emit(policyRecordData);
        }
    }

    /**
     * Click event to show the endorsement
     */
    onClickShowEndorsement(): void {
        if(!!this.policyRecord) {
            const policyRecordData: PolicyRecordData = {
                sourceId: this.policyRecord.sourceId,
                sourceContactId: '',
            }
            this.showEndorsement.emit(policyRecordData);
        }
    }

    /**
     * Click event to show the policy
     */
    onClickShowPolicy(): void {
        if(!!this.policyRecord) {
            const policyRecordData: PolicyRecordData = {
                sourceId: this.policyRecord.sourceId,
                sourceContactId: this.policyRecord.sourceContactId,
            }
            this.showPolicy.emit(policyRecordData);
        }
    }

    /**
     * Click event to show the policy details
     */
    onClickShowPolicyDetails(): void {
        if(!!this.policyRecord) {
            const policyRecordData: PolicyRecordData = {
                sourceId: this.policyRecord.sourceId,
                sourceContactId: this.policyRecord.sourceContactId,
            }
            this.showPolicyDetails.emit(policyRecordData);
        }
    }

    private _updatePolicyRecordTypeDescription(): void {
        if(!!this.policyRecord) {
            switch(this.policyRecord.policyRecordTypeId) {
                case POLICY_RECORD_TYPES.ENDORSEMENT:
                    this.policyRecord.policyRecordTypeDescription = this.policyRecord.policyRecordTypeDescription.replace('[endorsementTypeName]', '<strong>'+this.policyRecord.endorsementTypeName+'</strong>');
                    this.policyRecord.policyRecordTypeDescription = this.policyRecord.policyRecordTypeDescription.replace('[endorsementNumber]', '<strong>'+this.policyRecord.endorsementNumber+'</strong>');
                    break;

                case POLICY_RECORD_TYPES.RENEWED:
                case POLICY_RECORD_TYPES.REISSUED:
                    let insurerName: string = (!!this.policyRecord.insurerName) ? this.policyRecord.insurerName : 'INDEFINIDO';
                    insurerName = insurerName;
                    this.policyRecord.policyRecordTypeDescription = this.policyRecord.policyRecordTypeDescription.replace('[insurerName]', '<strong>'+insurerName+'</strong>');
                    const policyNumber: string = (!!this.policyRecord.policyNumber) ? this.policyRecord.policyNumber : 'INCOMPLETA';
                    this.policyRecord.policyRecordTypeDescription = this.policyRecord.policyRecordTypeDescription.replace('[policyNumber]', '<strong>'+policyNumber+'</strong>');
                    break;

                case POLICY_RECORD_TYPES.CANCELLED:
                    this.policyRecord.policyRecordTypeDescription = this.policyRecord.policyRecordTypeDescription.replace('[policyCancellationReasonName]', '<strong>'+this.policyRecord.policyCancellationReasonName+'</strong>');
                    break;
            }
        }
    }

}
