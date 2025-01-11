import { Component, Input } from '@angular/core';

import { LoadingService } from '@core/services/loading/loading.service';

import { ButtonDownloadReportInsuranceSinistersService } from './button-download-report-insurance-sinisters.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-button-download-report-insurance-sinisters',
    templateUrl: './button-download-report-insurance-sinisters.component.html',
    styles: [],
    providers: [ButtonDownloadReportInsuranceSinistersService],
    standalone: false
})
export class ButtonDownloadReportInsuranceSinistersComponent {
    @Input() insuranceId: number = 0;
    @Input() rangeField: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';
    @Input() specialFilter: string = '';
    modalIdSelectReportFormat: string = 'bdrsv-select-report-format';

    constructor(
        public model: ButtonDownloadReportInsuranceSinistersService,
        private _loadingService: LoadingService
    ) {}

    showModalToSelectReportFormat(): void {
        ModalPlugin.show(this.modalIdSelectReportFormat);
    }

    downloadReport(formatType: number): void {
        this._loadingService.show();
        this.model
            .downloadReport(
                this.insuranceId,
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
