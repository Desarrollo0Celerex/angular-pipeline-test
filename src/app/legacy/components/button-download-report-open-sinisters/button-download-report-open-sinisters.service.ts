import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

import { SINISTER_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { SinisterService } from '@services/sinister.service';

@Injectable()
export class ButtonDownloadReportOpenSinistersService {
    constructor(private _sinisterService: SinisterService) {}

    downloadReport(
        rangeField: string,
        rangeStart: string,
        rangeEnd: string,
        specialFilter: string,
        formatType: number
    ): Promise<void> {
        return new Promise((resolve) => {
            const sortBy: string = 'sinisterDate';
            this._sinisterService
                .downloadReportOpenSinisters(
                    rangeField,
                    rangeStart,
                    rangeEnd,
                    sortBy,
                    specialFilter,
                    formatType
                )
                .then((response: any) => {
                    const filename = response.headers
                        .get('content-disposition')
                        .split(';')[1]
                        .split('filename')[1]
                        .split('=')[1]
                        .split('"')[1]
                        .trim();
                    const blob = new Blob([response.body], {
                        type: response.type.toString(),
                    });
                    saveAs(blob, filename);
                    resolve();
                });
        });
    }
}
