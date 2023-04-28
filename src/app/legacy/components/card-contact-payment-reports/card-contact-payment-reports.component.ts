import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { CardContactPaymentReportsService } from './card-contact-payment-reports.service';

const REPORT_TYPES: any = {
    APPLIED_PAYMENTS: 1,
    PENDING_PAYMENTS: 2
};

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
    REPORT_TYPES: any = REPORT_TYPES;
    modalIdSelectReportFormat: string = 'cppr-modal-select-report-format';
    selectedReportType: number = REPORT_TYPES.PENDING_PAYMENTS;

    constructor(
        public model: CardContactPaymentReportsService,
        private _router: Router,
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contactId && changes.contactId.currentValue) {
            this.model.loadTotalPayments(changes.contactId.currentValue, this.rangeStart, this.rangeEnd)
        }
    }

    get canDownloadReport(): boolean {
        let canDownloadReport: boolean = true;
        switch(this.selectedReportType) {
            case REPORT_TYPES.APPLIED_PAYMENTS:
                canDownloadReport = (this.model.totalContactAppliedPayments === 0) ? false : true;
            break;
            case REPORT_TYPES.PENDING_PAYMENTS:
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
        switch(this.selectedReportType) {
            case REPORT_TYPES.APPLIED_PAYMENTS:
                label = (this.model.totalContactAppliedPayments === 1) ? 'Recibo Aplicado' : 'Recibos Aplicados';
                description = this.model.totalContactAppliedPayments + ' ' + label;
            break;
            case REPORT_TYPES.PENDING_PAYMENTS:
                label = (this.model.totalContactPendingPayments === 1) ? 'Recibo Pendiente' : 'Recibos Pendientes';
                description = this.model.totalContactPendingPayments + ' ' + label;
            break;
        }
        return description;
    }

    get title(): string {
        let title: string = '';
        switch(this.selectedReportType) {
            case REPORT_TYPES.APPLIED_PAYMENTS:
                title = 'Recibos Aplicados';
            break;
            case REPORT_TYPES.PENDING_PAYMENTS:
                title = 'Recibos Pendientes';
            break;
        }
        return title;
    }

    get totalContactPayments(): number {
        return this.model.totalContactAppliedPayments + this.model.totalContactPendingPayments;
    }

    selectRoute(): void {
        const formattedRangeStart = this.rangeStart.split('/').join('-');
        const formattedRangeEnd = this.rangeEnd.split('/').join('-');
        const route: string = (this.selectedReportType === REPORT_TYPES.PENDING_PAYMENTS ) 
        ? ROUTES_NAME.contactPendingPaymentsByRange(this.contactId, formattedRangeStart, formattedRangeEnd)
        : ROUTES_NAME.contactReceiptsAppliedByRange(this.contactId, formattedRangeStart, formattedRangeEnd);
        this._router.navigateByUrl(route);
    }

    selectReportType(reportType: number): void {
        this.selectedReportType = reportType;
    }
}
