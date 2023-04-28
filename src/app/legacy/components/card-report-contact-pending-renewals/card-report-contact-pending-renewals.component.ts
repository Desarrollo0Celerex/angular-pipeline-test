import { Component, Input } from '@angular/core';

import { LoadingService } from '@services/loading.service';

import { CardReportContactPendingRenewalsService } from './card-report-contact-pending-renewals.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-card-report-contact-pending-renewals',
  templateUrl: './card-report-contact-pending-renewals.component.html',
  styles: [
  ],
  providers: [CardReportContactPendingRenewalsService]
})
export class CardReportContactPendingRenewalsComponent {
    @Input() contactId: string = '';
    @Input() rangeField: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';
    modalIdSelectReportFormat: string = 'agt-select-report-format';

    constructor(
        public model: CardReportContactPendingRenewalsService,
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
