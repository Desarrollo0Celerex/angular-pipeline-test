import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { LoadingService } from '@services/loading.service';

import { CardContactPaymentReportsService } from './card-contact-payment-reports.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-card-contact-payment-reports',
  templateUrl: './card-contact-payment-reports.component.html',
  styles: [
  ],
  providers: [CardContactPaymentReportsService]
})
export class CardContactPaymentReportsComponent implements OnChanges {
    @Input() contactId: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';
    modalIdSelectReportFormat: string = 'cppr-modal-select-report-format';

    constructor(
        public model: CardContactPaymentReportsService,
        private _loadingService: LoadingService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contactId && changes.contactId.currentValue) {
            this.model.loadTotalPayments(changes.contactId.currentValue, this.rangeStart, this.rangeEnd)
        }
    }

    get canDownloadReport(): boolean {
        let canDownloadReport: boolean = true;
        switch(this.model.selectedReportType) {
            case this.model.REPORT_TYPES.APPLIED_PAYMENTS:
                canDownloadReport = (this.model.totalContactAppliedPayments === 0) ? false : true;
            break;
            case this.model.REPORT_TYPES.PENDING_PAYMENTS:
                canDownloadReport = (this.model.totalContactPendingPayments === 0) ? false : true;
            break;
        }
        return canDownloadReport;
    }

    get contentTypeName(): string {
        return (this.totalContactPayments === 1) ? 'Recibo' : 'Recibos';
    }

    get description(): string {
        let description: string = '';
        let label: string = '';
        switch(this.model.selectedReportType) {
            case this.model.REPORT_TYPES.APPLIED_PAYMENTS:
                label = (this.model.totalContactAppliedPayments === 1) ? 'Recibo Aplicado' : 'Recibos Aplicados';
                description = this.model.totalContactAppliedPayments + ' ' + label;
            break;
            case this.model.REPORT_TYPES.PENDING_PAYMENTS:
                label = (this.model.totalContactPendingPayments === 1) ? 'Recibo Pendiente' : 'Recibos Pendientes';
                description = this.model.totalContactPendingPayments + ' ' + label;
            break;
        }
        return description;
    }

    get title(): string {
        let title: string = '';
        switch(this.model.selectedReportType) {
            case this.model.REPORT_TYPES.APPLIED_PAYMENTS:
                title = 'Recibos Aplicados';
            break;
            case this.model.REPORT_TYPES.PENDING_PAYMENTS:
                title = 'Recibos Pendientes';
            break;
        }
        return title;
    }

    get totalContactPayments(): number {
        return this.model.totalContactAppliedPayments + this.model.totalContactPendingPayments;
    }

    downloadReport(formatType: number): void {
        this._loadingService.show();
        this.model.downloadReport(this.contactId, this.rangeStart, this.rangeEnd, formatType).then(() => {
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
