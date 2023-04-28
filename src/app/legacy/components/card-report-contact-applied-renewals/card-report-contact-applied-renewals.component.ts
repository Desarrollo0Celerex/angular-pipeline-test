import { Component, Input } from '@angular/core';

import { LoadingService } from '@services/loading.service';

import { CardReportContactAppliedRenewalsService } from './card-report-contact-applied-renewals.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-card-report-contact-applied-renewals',
  templateUrl: './card-report-contact-applied-renewals.component.html',
  styles: [
  ],
  providers: [CardReportContactAppliedRenewalsService]
})
export class CardReportContactAppliedRenewalsComponent {
    @Input() contactId: string = '';
    @Input() rangeField: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';
    @Input() specialFilter: string = '';
    modalIdSelectReportFormat: string = 'agt-select-report-format';

    constructor(
        public model: CardReportContactAppliedRenewalsService,
        private _loadingService: LoadingService
    ) { }

    downloadReport(formatType: number): void {
        this._loadingService.show();
        this.model.downloadReport(this.contactId, this.rangeField, this.rangeStart, this.rangeEnd, formatType).then(() => {
            this._loadingService.hide();
        });
    }

    showModalToSelectReportFormat(): void {
        ModalPlugin.show(this.modalIdSelectReportFormat);
    }

}
