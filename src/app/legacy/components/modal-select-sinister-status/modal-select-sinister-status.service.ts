import { Injectable } from '@angular/core';

import { SinisterStatus } from '@interfaces/sinister-status.interface';
import { SinisterStatusService } from '@services/sinister-status.service';

@Injectable()
export class ModalSelectSinisterStatusService {
    sinisterStatus: SinisterStatus[] = [];

    constructor(private _sinisterStatusService: SinisterStatusService) { }

    /**
     * Get the sinister status name
     * @param  contentSubtype The content subtype
     * @return                The sinister status name
     */
    getSinisterStatusName(contentSubtype: number): string {
        const sinisterStatus: SinisterStatus | undefined = this.sinisterStatus.find( (element: SinisterStatus) => element.sinisterStatusId === contentSubtype)
        return (!!sinisterStatus) ? sinisterStatus.name : '';
    }

    /**
     * Load the sinister status
     */
    loadSinisterStatus(): void {
        this.sinisterStatus = this._sinisterStatusService.getProfileSinisterStatus();
    }
}
