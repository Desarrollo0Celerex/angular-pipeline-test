import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { LoadingService } from '@services/loading.service';

import { CardPartnerRenewalReportsService } from './card-partner-renewal-reports.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-card-partner-renewal-reports',
  templateUrl: './card-partner-renewal-reports.component.html',
  styles: [
  ],
  providers: [CardPartnerRenewalReportsService]
})
export class CardPartnerRenewalReportsComponent implements OnChanges {
    @Input() partnerId: number = 0;
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';
    modalIdSelectReportFormat: string = 'cprr-modal-select-report-format';

    constructor(
        public model: CardPartnerRenewalReportsService,
        private _loadingService: LoadingService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.partnerId && changes.partnerId.currentValue) {
            this.model.loadTotalRenewals(changes.partnerId.currentValue, this.rangeStart, this.rangeEnd)
        }
    }
    get canDownloadReport(): boolean {
        let canDownloadReport: boolean = true;
        switch(this.model.selectedReportType) {
            case this.model.REPORT_TYPES.APPLIED_RENEWALS:
                canDownloadReport = (this.model.totalPartnerAppliedRenewals === 0) ? false : true;
            break;
            case this.model.REPORT_TYPES.PENDING_RENEWALS:
                canDownloadReport = (this.model.totalPartnerPendingRenewals === 0) ? false : true;
            break;
        }
        return canDownloadReport;
    }

    get contentTypeName(): string {
        return (this.totalPartnerRenewals === 1) ? 'Póliza' : 'Pólizas';
    }

    get description(): string {
        let description: string = '';
        let label: string = '';
        switch(this.model.selectedReportType) {
            case this.model.REPORT_TYPES.APPLIED_RENEWALS:
                label = (this.model.totalPartnerAppliedRenewals === 1) ? 'Renovación Aplicada' : 'Renovaciones Aplicadas';
                description = this.model.totalPartnerAppliedRenewals + ' ' + label;
            break;
            case this.model.REPORT_TYPES.PENDING_RENEWALS:
                label = (this.model.totalPartnerPendingRenewals === 1) ? 'Renovación Pendiente' : 'Renovaciones Pendientes';
                description = this.model.totalPartnerPendingRenewals + ' ' + label;
            break;
        }
        return description;
    }

    get title(): string {
        let title: string = '';
        switch(this.model.selectedReportType) {
            case this.model.REPORT_TYPES.APPLIED_RENEWALS:
                title = 'Renovaciones Aplicadas';
            break;
            case this.model.REPORT_TYPES.PENDING_RENEWALS:
                title = 'Renovaciones Pendientes';
            break;
        }
        return title;
    }

    get totalPartnerRenewals(): number {
        return this.model.totalPartnerAppliedRenewals + this.model.totalPartnerPendingRenewals;
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
