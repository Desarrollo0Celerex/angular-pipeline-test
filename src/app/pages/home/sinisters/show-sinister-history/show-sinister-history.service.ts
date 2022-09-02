import { Injectable } from '@angular/core';

import { HttpResponse } from '@interfaces/http-response.interface';
import { Sinister } from '@interfaces/sinister.interface';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { SinisterService } from '@services/sinister.service';

@Injectable()
export class ShowSinisterHistoryService {
    sinister: Sinister | null = null;

    constructor(private _sinisterService: SinisterService) { }

    /**
     * Load the sinister
     * @param sinisterData The sinister data
     */
    loadSinister(sinisterData: SinisterDataSend): void {
        const fields: string = 'sinisterId,sinisterNumber,invoice,certificate,sinisterDate,sinisterStatusId,estimatedResolutionDate,manager,internalNumber,sinisterTypeName,affectedCoverage,location,affectedName,policyNumber,insuranceTypeId,policyInsuredId';
        this._sinisterService.getPolicySinister(sinisterData.contactId, sinisterData.policyId, sinisterData.sinisterId, fields).subscribe((res: HttpResponse) => {
            this.sinister = res.data;
            /*if(!!this.sinister!.policyInsuredId) {
                this._loadInsured(sinisterData.contactId, sinisterData.policyId, this.sinister!.policyInsuredId);
            }*/
        })
    }

    /**/
}
