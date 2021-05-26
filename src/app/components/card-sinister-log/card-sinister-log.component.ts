import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { SINISTER_RECORD_TYPES } from '@constants/global';
import { SinisterLog } from '@interfaces/sinister-log.interface';
import { SinisterEventDataSend } from '@interfaces/sinister-event-data-send.interface';

@Component({
  selector: 'agt-card-sinister-log',
  templateUrl: './card-sinister-log.component.html',
  styles: [
  ]
})
export class CardSinisterLogComponent implements OnInit {
    @Input() sinisterLog: SinisterLog | null = null;
    @Output() updateSinisterEvent: EventEmitter<SinisterEventDataSend> = new EventEmitter<SinisterEventDataSend>();
    SINISTER_RECORD_TYPES: any = SINISTER_RECORD_TYPES;

    constructor() { }

    ngOnInit(): void {
    }

    /**
     * Event to request update the sinister event
     */
    onClickUpdateSinisterEvent(): void {
        if(!!this.sinisterLog) {
            const sinisterEventData: SinisterEventDataSend = {
                contactId: this.sinisterLog.contactId,
                policyId: this.sinisterLog.policyId,
                sinisterId: this.sinisterLog.sinisterId,
                sinisterEventId: this.sinisterLog.logSourceId
            }
            this.updateSinisterEvent.emit(sinisterEventData);
        }
    }

}
