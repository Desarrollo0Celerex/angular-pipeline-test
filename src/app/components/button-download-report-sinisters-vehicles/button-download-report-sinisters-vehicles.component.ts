import { Component, OnInit } from '@angular/core';

import { LoadingService } from '@services/loading.service';

import { ButtonDownloadReportSinistersVehiclesService } from './button-download-report-sinisters-vehicles.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-button-download-report-sinisters-vehicles',
  templateUrl: './button-download-report-sinisters-vehicles.component.html',
  styles: [
  ],
  providers: [ButtonDownloadReportSinistersVehiclesService]
})
export class ButtonDownloadReportSinistersVehiclesComponent implements OnInit {
    modalIdSelectReportFormat: string = 'bdrsv-select-report-format';

    constructor(
        public model: ButtonDownloadReportSinistersVehiclesService,
        private _loadingService: LoadingService
    ) { }

    ngOnInit(): void {
    }

    showModalToSelectReportFormat(): void {
        ModalPlugin.show(this.modalIdSelectReportFormat);
    }

    downloadReport(formatType: number): void {
        this._loadingService.show();
        this.model.downloadReport(formatType).then(() => {
            this._loadingService.hide();
        });
    }

}
