import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { LoadingService } from '@services/loading.service';

import { CardGroupPaymentReportsService } from './card-group-payment-reports.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-card-group-payment-reports',
  templateUrl: './card-group-payment-reports.component.html',
  styles: [
  ],
  providers: [CardGroupPaymentReportsService]
})
export class CardGroupPaymentReportsComponent implements OnChanges {
    @Input() groupId: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';
    modalIdSelectReportFormat: string = 'cppr-modal-select-report-format';

    constructor(
        public model: CardGroupPaymentReportsService,
        private _loadingService: LoadingService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.groupId && changes.groupId.currentValue) {
            this.model.loadTotalPayments(changes.groupId.currentValue, this.rangeStart, this.rangeEnd)
        }
    }

    get canDownloadReport(): boolean {
        let canDownloadReport: boolean = true;
        switch(this.model.selectedReportType) {
            case this.model.REPORT_TYPES.APPLIED_PAYMENTS:
                canDownloadReport = (this.model.totalGroupAppliedPayments === 0) ? false : true;
            break;
            case this.model.REPORT_TYPES.PENDING_PAYMENTS:
                canDownloadReport = (this.model.totalGroupPendingPayments === 0) ? false : true;
            break;
        }
        return canDownloadReport;
    }

    get contentTypeName(): string {
        return (this.totalGroupPayments === 1) ? 'Recibo' : 'Recibos';
    }

    get description(): string {
        let description: string = '';
        let label: string = '';
        switch(this.model.selectedReportType) {
            case this.model.REPORT_TYPES.APPLIED_PAYMENTS:
                label = (this.model.totalGroupAppliedPayments === 1) ? 'Recibo Aplicado' : 'Recibos Aplicados';
                description = this.model.totalGroupAppliedPayments + ' ' + label;
            break;
            case this.model.REPORT_TYPES.PENDING_PAYMENTS:
                label = (this.model.totalGroupPendingPayments === 1) ? 'Recibo Pendiente' : 'Recibos Pendientes';
                description = this.model.totalGroupPendingPayments + ' ' + label;
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

    get totalGroupPayments(): number {
        return this.model.totalGroupAppliedPayments + this.model.totalGroupPendingPayments;
    }

    downloadReport(formatType: number): void {
        this._loadingService.show();
        this.model.downloadReport(this.groupId, this.rangeStart, this.rangeEnd, formatType).then(() => {
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
