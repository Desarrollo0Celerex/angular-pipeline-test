import { Injectable } from '@angular/core';

import { SinisterEvidence } from '@interfaces/sinister-evidence.interface';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { SinisterEvidenceService } from '@services/sinister-evidence.service';

@Injectable()
export class ModalShowSinisterEvidencesService {
    sinisterEvidences: SinisterEvidence[] = [];

    constructor(private _sinisterEvidenceService: SinisterEvidenceService) { }

    loadSinisterEvidences(sinisterData: SinisterDataSend): void {
        const fields: string = 'sinisterEvidenceId,name,extension,sinisterEvidenceTypeName,evidenceUrl,createdAt';
        this._sinisterEvidenceService.getSinisterEvidences(sinisterData, fields).subscribe((res: SinisterEvidence[]) => {
            this.sinisterEvidences = res;
        })
    } 
}
