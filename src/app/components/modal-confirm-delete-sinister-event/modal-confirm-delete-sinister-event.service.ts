import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SinisterEventDataSend } from '@interfaces/sinister-event-data-send.interface';
import { SinisterEventService } from '@services/sinister-event.service';

@Injectable()
export class ModalConfirmDeleteSinisterEventService {

    constructor(private _sinisterEventService: SinisterEventService) { }

    /**
     * Delete the sinister event
     * @param  sinisterEventData The sinister event data
     * @return                   Notice of action done
     */
    deleteSinisterEvent(sinisterEventData: SinisterEventDataSend): Observable<void> {
        return this._sinisterEventService.deleteSinisterEvent(sinisterEventData);
    }
}
