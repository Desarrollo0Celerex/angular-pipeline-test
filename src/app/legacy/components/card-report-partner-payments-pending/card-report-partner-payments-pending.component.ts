import { Component, Input } from '@angular/core';

import { LoadingService } from '@core/services/loading/loading.service';

import { CardReportPartnerPaymentsPendingService } from './card-report-partner-payments-pending.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-card-report-partner-payments-pending',
  templateUrl: './card-report-partner-payments-pending.component.html',
  styles: [
  ],
  providers: [CardReportPartnerPaymentsPendingService]
})
export class CardReportPartnerPaymentsPendingComponent {
    @Input() partnerId: string = '';
    @Input() rangeField: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';
    @Input() specialFilter: string = '';
    modalIdSelectReportFormat: string = 'agt-select-report-format';

    constructor(
        public model: CardReportPartnerPaymentsPendingService,
        private _loadingService: LoadingService
    ) {}

    downloadReport(formatType: number): void {
        this._loadingService.show();
        this.model
            .downloadReport(
                this.partnerId,
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

    showModalToSelectReportFormat(): void {
        ModalPlugin.show(this.modalIdSelectReportFormat);
    }
}
