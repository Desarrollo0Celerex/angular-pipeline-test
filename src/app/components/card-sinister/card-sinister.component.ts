import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { SINISTER_STATUS } from '@constants/global';
import { PolicyDataSend } from '@interfaces/policy-data-send.interface';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { Sinister } from '@interfaces/sinister.interface';

declare var PopoverPlugin: any;
declare var TooltipPlugin: any;

@Component({
  selector: 'agt-card-sinister',
  templateUrl: './card-sinister.component.html',
  styles: [
  ]
})
export class CardSinisterComponent implements OnInit {
    @Input() sinister: Sinister | null = null;
    @Output() finalizeSinister: EventEmitter<SinisterDataSend> = new EventEmitter<SinisterDataSend>();
    @Output() reactivateSinister: EventEmitter<SinisterDataSend> = new EventEmitter<SinisterDataSend>();
    @Output() showContactData: EventEmitter<string> = new EventEmitter<string>();
    @Output() showHistoryPolicy: EventEmitter<PolicyDataSend> = new EventEmitter<PolicyDataSend>();
    @Output() showHistorySinister: EventEmitter<SinisterDataSend> = new EventEmitter<SinisterDataSend>();
    @Output() showPolicy: EventEmitter<PolicyDataSend> = new EventEmitter<PolicyDataSend>();
    @Output() showSinisterDetails: EventEmitter<Sinister> = new EventEmitter<Sinister>();
    SINISTER_STATUS: any = SINISTER_STATUS;

    constructor() { }

    ngOnInit(): void {
        TooltipPlugin.init();
        PopoverPlugin.init();
    }

    /**
     * Click event to request finalize the sinister
     */
    onClickFinalizeSinister(): void {
        if(!!this.sinister) {
            const data: SinisterDataSend = {
                contactId: this.sinister.contactId,
                policyId: this.sinister.policyId,
                sinisterId: this.sinister.sinisterId
            }
            this.finalizeSinister.emit(data);
        }
    }

    /**
     * Click event to request reactivate the sinister
     */
    onClickReactivateSinister(): void {
        if(!!this.sinister) {
            const data: SinisterDataSend = {
                contactId: this.sinister.contactId,
                policyId: this.sinister.policyId,
                sinisterId: this.sinister.sinisterId
            }
            this.reactivateSinister.emit(data);
        }
    }

    /**
     * Click event to request show the contact data
     */
    onClickShowContactData(): void {
        if(!!this.sinister) {
            this.showContactData.emit(this.sinister.contactId);
        }
    }

    /**
     * Click event to request show the sinister details
     */
    onClickShowDetails(): void {
        if(!!this.sinister) {
            this.showSinisterDetails.emit(this.sinister);
        }
    }

    /**
     * Click event to request show the history policy
     */
    onClickShowHistoryPolicy(): void {
        if(!!this.sinister) {
            this.showHistoryPolicy.emit({policyId: this.sinister.policyId, contactId: this.sinister.contactId});
        }
    }

    /**
     * Click event to show the history of the sinister
     */
    onClickShowHistorySinister(): void {
        if(!!this.sinister) {
            const data: SinisterDataSend = {
                contactId: this.sinister.contactId,
                policyId: this.sinister.policyId,
                sinisterId: this.sinister.sinisterId
            }
            this.showHistorySinister.emit(data);
        }
    }

    /**
     * Click event to show the policy
     */
    onClickShowPolicy(): void {
        if(!!this.sinister) {
            const data: PolicyDataSend = {
                contactId: this.sinister.contactId,
                policyId: this.sinister.policyId
            }
            this.showPolicy.emit(data);
        }
    }

}
