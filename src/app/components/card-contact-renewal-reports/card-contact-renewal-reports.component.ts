import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { CardContactRenewalReportsService } from './card-contact-renewal-reports.service';

const REPORT_TYPES: any = {
    APPLIED_RENEWALS: 1,
    PENDING_RENEWALS: 2
};

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
    REPORT_TYPES: any = REPORT_TYPES;
    modalIdSelectReportFormat: string = 'cprr-modal-select-report-format';
    selectedReportType: number = REPORT_TYPES.PENDING_RENEWALS;

    constructor(
        public model: CardContactRenewalReportsService,
        private _router: Router
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contactId && changes.contactId.currentValue) {
            this.model.loadTotalRenewals(changes.contactId.currentValue, this.rangeStart, this.rangeEnd)
        }
    }

    get canDownloadReport(): boolean {
        let canDownloadReport: boolean = true;
        switch(this.selectedReportType) {
            case this.REPORT_TYPES.APPLIED_RENEWALS:
                canDownloadReport = (this.model.totalContactAppliedRenewals === 0) ? false : true;
            break;
            case this.REPORT_TYPES.PENDING_RENEWALS:
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
        switch(this.selectedReportType) {
            case this.REPORT_TYPES.APPLIED_RENEWALS:
                label = (this.model.totalContactAppliedRenewals === 1) ? 'Renovación Aplicada' : 'Renovaciones Aplicadas';
                description = this.model.totalContactAppliedRenewals + ' ' + label;
            break;
            case this.REPORT_TYPES.PENDING_RENEWALS:
                label = (this.model.totalContactPendingRenewals === 1) ? 'Renovación Pendiente' : 'Renovaciones Pendientes';
                description = this.model.totalContactPendingRenewals + ' ' + label;
            break;
        }
        return description;
    }

    get title(): string {
        let title: string = '';
        switch(this.selectedReportType) {
            case this.REPORT_TYPES.APPLIED_RENEWALS:
                title = 'Renovaciones Aplicadas';
            break;
            case this.REPORT_TYPES.PENDING_RENEWALS:
                title = 'Renovaciones Pendientes';
            break;
        }
        return title;
    }

    get totalContactRenewals(): number {
        return this.model.totalContactAppliedRenewals + this.model.totalContactPendingRenewals;
    }
    

    /* downloadReport(formatType: number): void {
        this._loadingService.show();
        this.model.downloadReport(this.contactId, this.rangeStart, this.rangeEnd, formatType).then(() => {
            this._loadingService.hide();
        });
    } */

    selectReportType(reportType: number): void {
        this.selectedReportType = reportType;
    }

    selectRoute(): void {
        const formattedRangeStart = this.rangeStart.split('/').join('-');
        const formattedRangeEnd = this.rangeEnd.split('/').join('-');
        const route: string = (this.selectedReportType === REPORT_TYPES.PENDING_RENEWALS ) 
        ? ROUTES_NAME.contactPendingRenewalsByRange(this.contactId, formattedRangeStart, formattedRangeEnd)
        : ROUTES_NAME.contactAppliedRenewalsByRange(this.contactId, formattedRangeStart, formattedRangeEnd);
        this._router.navigateByUrl(route);
    }

    /* showModalToSelectReportFormat(): void {
        ModalPlugin.show(this.modalIdSelectReportFormat);
    } */
}
