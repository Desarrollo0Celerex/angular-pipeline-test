import { Component, Input } from '@angular/core';

import { LoadingService } from '@services/loading.service';

import { CardReportActivePoliciesService } from './card-report-active-policies.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-card-report-active-policies',
  templateUrl: './card-report-active-policies.component.html',
  styles: [
  ],
  providers: [CardReportActivePoliciesService]
})
export class CardReportActivePoliciesComponent {
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';
    @Input() specialFilter: string = '';
    modalIdSelectReportFormat: string = 'agt-select-report-format';

    constructor(
        public model: CardReportActivePoliciesService,
        private _loadingService: LoadingService
    ) { }

    downloadReport(formatType: number): void {
        this._loadingService.show();
        this.model.downloadReport(this.rangeStart, this.rangeEnd, this.specialFilter, formatType).then(() => {
            this._loadingService.hide();
        });
    }

    showModalToSelectReportFormat(): void {
        ModalPlugin.show(this.modalIdSelectReportFormat);
    }

}
