import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { LoadingService } from '@services/loading.service';

import { CardPartnerPaymentReportsService } from './card-partner-payment-reports.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-card-partner-payment-reports',
  templateUrl: './card-partner-payment-reports.component.html',
  styles: [
  ],
  providers: [CardPartnerPaymentReportsService]
})
export class CardPartnerPaymentReportsComponent implements OnChanges {
    @Input() partnerId: number = 0;
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';
    modalIdSelectReportFormat: string = 'cppr-modal-select-report-format';

    constructor(
        public model: CardPartnerPaymentReportsService,
        private _loadingService: LoadingService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.partnerId && changes.partnerId.currentValue) {
            this.model.loadTotalPayments(changes.partnerId.currentValue, this.rangeStart, this.rangeEnd)
        }
    }

    downloadReport(formatType: number): void {
        this._loadingService.show();
        this.model.downloadReport(this.partnerId, this.rangeStart, this.rangeEnd, formatType).then(() => {
            this._loadingService.hide();
        });
    }

    selectReportType(reportType: number): void {
        this.model.selectedReportType = reportType;
    }

    showModalToSelectReportFormat(): void {
        ModalPlugin.show(this.modalIdSelectReportFormat);
    }
}
