import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { LoadingService } from '@services/loading.service';

import { CardContactRenewalReportsService } from './card-contact-renewal-reports.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-card-contact-renewal-reports',
  templateUrl: './card-contact-renewal-reports.component.html',
  styles: [
  ],
  providers: [CardContactRenewalReportsService]
})
export class CardContactRenewalReportsComponent implements OnChanges {
    @Input() contactId: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';
    modalIdSelectReportFormat: string = 'cprr-modal-select-report-format';

    constructor(
        public model: CardContactRenewalReportsService,
        private _loadingService: LoadingService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contactId && changes.contactId.currentValue) {
            this.model.loadTotalRenewals(changes.contactId.currentValue, this.rangeStart, this.rangeEnd)
        }
    }

    get canDownloadReport(): boolean {
        let canDownloadReport: boolean = true;
        switch(this.model.selectedReportType) {
            case this.model.REPORT_TYPES.APPLIED_RENEWALS:
                canDownloadReport = (this.model.totalContactAppliedRenewals === 0) ? false : true;
            break;
            case this.model.REPORT_TYPES.PENDING_RENEWALS:
                canDownloadReport = (this.model.totalContactPendingRenewals === 0) ? false : true;
            break;
        }
        return canDownloadReport;
    }

    get contentTypeName(): string {
        return (this.totalContactRenewals === 1) ? 'Póliza' : 'Pólizas';
    }

    get description(): string {
        let description: string = '';
        let label: string = '';
        switch(this.model.selectedReportType) {
            case this.model.REPORT_TYPES.APPLIED_RENEWALS:
                label = (this.model.totalContactAppliedRenewals === 1) ? 'Renovación Aplicada' : 'Renovaciones Aplicadas';
                description = this.model.totalContactAppliedRenewals + ' ' + label;
            break;
            case this.model.REPORT_TYPES.PENDING_RENEWALS:
                label = (this.model.totalContactPendingRenewals === 1) ? 'Renovación Pendiente' : 'Renovaciones Pendientes';
                description = this.model.totalContactPendingRenewals + ' ' + label;
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

    get totalContactRenewals(): number {
        return this.model.totalContactAppliedRenewals + this.model.totalContactPendingRenewals;
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
