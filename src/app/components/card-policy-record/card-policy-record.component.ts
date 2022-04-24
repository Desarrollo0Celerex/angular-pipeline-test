import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { POLICY_RECORD_TYPES } from '@constants/global';
import { PolicyRecord } from '@interfaces/policy-record.interface';
import { PolicyRecordData } from '@interfaces/policy-record-data.interface';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { Sinister } from '@interfaces/sinister.interface';

@Component({
  selector: 'agt-card-policy-record',
  templateUrl: './card-policy-record.component.html',
  styles: [
  ]
})
export class CardPolicyRecordComponent implements OnInit {
    @Input() policyRecord: PolicyRecord | null = null;
    @Output() completePolicy: EventEmitter<PolicyRecordData> = new EventEmitter<PolicyRecordData>();
    @Output() showCancellationEvidence: EventEmitter<PolicyRecordData> = new EventEmitter<PolicyRecordData>();
    @Output() showEndorsement: EventEmitter<PolicyRecordData> = new EventEmitter<PolicyRecordData>();
    @Output() showPolicy: EventEmitter<PolicyRecordData> = new EventEmitter<PolicyRecordData>();
    @Output() showPolicyDetails: EventEmitter<PolicyRecordData> = new EventEmitter<PolicyRecordData>();
    @Output() showSinister: EventEmitter<SinisterDataSend> = new EventEmitter<SinisterDataSend>();
    @Output() showSinisterDetails: EventEmitter<Sinister> = new EventEmitter<Sinister>();
    POLICY_RECORD_TYPES: any = POLICY_RECORD_TYPES;

    constructor() { }

    ngOnInit(): void {
        this._updatePolicyRecordTypeDescription();
    }

    get endorsementComments(): string {
        return (!!this.policyRecord && !!this.policyRecord.endorsementComments) ? this.policyRecord.endorsementComments.replace(/(?:\r\n|\r|\n)/g, '<br>'): '';
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
     * Click event to show the cancellation evidence
     */
    onClickShowCancellationEvidence(): void {
        if(!!this.policyRecord) {
            const policyRecordData: PolicyRecordData = {
                sourceId: this.policyRecord.sourceId,
                sourceContactId: '',
            }
            this.showCancellationEvidence.emit(policyRecordData);
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

    /**
     * Click event to show sinister
     */
    onClickShowSinister(): void {
        if(!!this.policyRecord) {
            const sinisterData: SinisterDataSend = {
                contactId: this.policyRecord.contactId,
                policyId: this.policyRecord.policyId,
                sinisterId: this.policyRecord.sourceId
            }
            this.showSinister.emit(sinisterData);
        }
    }

    /**
     * Click event to show the sinister details
     */
    onClickShowSinisterDetails(): void {
        if(!!this.policyRecord) {
            const sinister: any = {
                titularName: this.policyRecord.titularName,
                policyNumber: this.policyRecord.policyNumber,
                sinisterNumber: this.policyRecord.sinisterNumber,
                invoice: this.policyRecord.invoice,
                certificate: this.policyRecord.certificate,
                sinisterDate: this.policyRecord.sinisterDate,
                dateLastEvent: this.policyRecord.dateLastEvent,
                totalEvents: this.policyRecord.totalEvents,
                contactId: this.policyRecord.contactId,
                policyId: this.policyRecord.policyId,
                sinisterId: this.policyRecord.sourceId,
                sinisterResolutionName: this.policyRecord.sinisterResolutionName,
                sinisterResolutionCurrencyName: this.policyRecord.sinisterResolutionCurrencyName,
                sinisterResolutionIndemnificationAmount: this.policyRecord.sinisterResolutionIndemnificationAmount
            }
            this.showSinisterDetails.emit(sinister);
        }
    }

    private _updatePolicyRecordTypeDescription(): void {
        if(!!this.policyRecord) {
            switch(this.policyRecord.policyRecordTypeId) {
                case POLICY_RECORD_TYPES.ENDORSEMENT:
                    this.policyRecord.policyRecordTypeDescription = this.policyRecord.policyRecordTypeDescription.replace('[endorsementTypeName]', '<strong>'+this.policyRecord.endorsementTypeShortName+'</strong>');
                    this.policyRecord.policyRecordTypeDescription = this.policyRecord.policyRecordTypeDescription.replace('[endorsementNumber]', '<strong>'+this.policyRecord.endorsementNumber+'</strong>');
                    break;

                case POLICY_RECORD_TYPES.RENEWED:
                case POLICY_RECORD_TYPES.REISSUED:
                case POLICY_RECORD_TYPES.RENOVATED:
                    let insurerName: string = (!!this.policyRecord.insurerName) ? this.policyRecord.insurerName : 'INDEFINIDO';
                    insurerName = insurerName;
                    this.policyRecord.policyRecordTypeDescription = this.policyRecord.policyRecordTypeDescription.replace('[insurerName]', '<strong>'+insurerName+'</strong>');
                    const policyNumber: string = (!!this.policyRecord.policyNumber) ? this.policyRecord.policyNumber : 'INCOMPLETA';
                    this.policyRecord.policyRecordTypeDescription = this.policyRecord.policyRecordTypeDescription.replace('[policyNumber]', '<strong>'+policyNumber+'</strong>');
                    break;

                case POLICY_RECORD_TYPES.CANCELLED:
                    this.policyRecord.policyRecordTypeDescription = this.policyRecord.policyRecordTypeDescription.replace('[policyCancellationReasonName]', '<strong>'+this.policyRecord.policyCancellationReasonName+'</strong>');
                    break;

                case POLICY_RECORD_TYPES.SINISTER:
                    this.policyRecord.policyRecordTypeDescription = this.policyRecord.policyRecordTypeDescription.replace('[sinisterTypeName]', '<strong>'+this.policyRecord.sinisterTypeName+'</strong>');
                    this.policyRecord.policyRecordTypeDescription = this.policyRecord.policyRecordTypeDescription.replace('[sinisterNumber]', '<strong>'+this.policyRecord.sinisterNumber+'</strong>');
                    break;
            }
        }
    }

}
