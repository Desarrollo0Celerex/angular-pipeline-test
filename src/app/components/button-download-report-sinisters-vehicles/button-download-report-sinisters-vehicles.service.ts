import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

import { SinisterService } from '@services/sinister.service';

@Injectable()
export class ButtonDownloadReportSinistersVehiclesService {

    constructor(private _sinisterService: SinisterService) { }

    downloadReport(formatType: number): Promise<void> {
        return new Promise((resolve) => {
            const sortBy: string = '-createdAt';
            this._sinisterService.downloadReportSinistersVehicles(formatType, sortBy).then((response: any) => {
              const filename = response.headers.get('content-disposition').split(';')[1].split('filename')[1].split('=')[1].split('"')[1].trim();
              const blob = new Blob([response.body], {type: response.type.toString()});
                  saveAs(blob, filename);
                  resolve();
            });
        });
    }
}
