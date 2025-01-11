import { Component, Input, OnInit } from '@angular/core';

import { LoadingService } from '@core/services/loading/loading.service';

import { ButtonDownloadReportOpenSinistersService } from './button-download-report-open-sinisters.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-button-download-report-open-sinisters',
    templateUrl: './button-download-report-open-sinisters.component.html',
    styles: [],
    providers: [ButtonDownloadReportOpenSinistersService],
    standalone: false
})
export class ButtonDownloadReportOpenSinistersComponent {
    @Input() rangeField: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';
    @Input() specialFilter: string = '';
    modalIdSelectReportFormat: string = 'bdros-select-report-format';

    constructor(
        public model: ButtonDownloadReportOpenSinistersService,
        private _loadingService: LoadingService
    ) {}

    showModalToSelectReportFormat(): void {
        ModalPlugin.show(this.modalIdSelectReportFormat);
    }

    downloadReport(formatType: number): void {
        this._loadingService.show();
        this.model
            .downloadReport(
                this.rangeField,
                this.rangeStart,
                this.rangeEnd,
                this.specialFilter,
                formatType
            )
            .then(() => {
                this._loadingService.hide();
            });
    }
}
