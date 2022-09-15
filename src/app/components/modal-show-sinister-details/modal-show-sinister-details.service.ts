import { Injectable } from '@angular/core';

import { Sinister } from '@interfaces/sinister.interface';
import { SinisterService } from '@services/sinister.service';

@Injectable()
export class ModalShowSinisterDetailsService {
    sinister: Sinister | null = null;

    constructor(private _sinisterService: SinisterService) { }

    loadSinister(contactId: string, policyId: string, sinisterId: string): void {
        this.sinister = null;
        const fields: string = 'titularName,policyNumber,manager,internalNumber,sinisterNumber,invoice,certificate,sinisterDate,estimatedResolutionDate,sinisterStatusId';
        this._sinisterService.getPolicySinister(contactId, policyId, sinisterId, fields).subscribe((sinister: Sinister) => {
            this.sinister = sinister;
        });
    }
}
