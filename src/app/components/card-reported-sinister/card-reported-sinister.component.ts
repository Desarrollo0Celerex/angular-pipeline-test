import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Sinister } from '@interfaces/sinister.interface';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';

@Component({
  selector: 'agt-card-reported-sinister',
  templateUrl: './card-reported-sinister.component.html',
  styles: [
  ]
})
export class CardReportedSinisterComponent implements OnInit {
    @Input() sinister: Sinister | null = null;
    @Output() showSinister: EventEmitter<SinisterDataSend> = new EventEmitter<SinisterDataSend>();
    @Output() showSinisterDetails: EventEmitter<Sinister> = new EventEmitter<Sinister>();

    constructor() { }

    ngOnInit(): void {
    }

    /**
     * Click event to show the sinister
     */
    onClickShowSinister(): void {
        if(!!this.sinister) {
            const sinisterData: SinisterDataSend = {
                contactId: this.sinister.contactId,
                policyId: this.sinister.policyId,
                sinisterId: this.sinister.sinisterId
            }
            this.showSinister.emit(sinisterData);
        }
    }

    /**
     * Click event to show modal with sinister details
     */
    onClickShowSinisterDetails(): void {
        if(!!this.sinister) {
            this.showSinisterDetails.emit(this.sinister);
        }
    }

}
