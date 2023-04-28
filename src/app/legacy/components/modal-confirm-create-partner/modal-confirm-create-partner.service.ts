import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreatePartnerDataSend } from '@interfaces/create-partner-data-send.interface';
import { PartnerService } from '@services/partner.service';

@Injectable()
export class ModalConfirmCreatePartnerService {

    constructor(private _partnerService: PartnerService) { }

    createPartner(name: string, ignoreMatches: boolean): Observable<void> {
        const requestBody: CreatePartnerDataSend = {
            name,
            ignoreMatches
        };
        return this._partnerService.createPartner(requestBody);
    }
}
