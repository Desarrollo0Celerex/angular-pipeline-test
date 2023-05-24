import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { LoadingService } from '@core/services/loading/loading.service';

import { CardPartnerPaymentReportsService } from './card-partner-payment-reports.service';
import { Router } from '@angular/router';
import { PARTNERS_ROUTES } from '@configs/routes.config';
const REPORT_TYPES: any = {
    APPLIED_PAYMENTS: 1,
    PENDING_PAYMENTS: 2
};
declare var ModalPlugin: any;

@Component({
    selector: 'agt-card-partner-payment-reports',
    templateUrl: './card-partner-payment-reports.component.html',
    styles: [],
    providers: [CardPartnerPaymentReportsService],
})
export class CardPartnerPaymentReportsComponent implements OnChanges {
    @Input() partnerId: number = 0;
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';
    modalIdSelectReportFormat: string = 'cppr-modal-select-report-format';
    selectedReportType: number = REPORT_TYPES.PENDING_PAYMENTS;

    constructor(
        public model: CardPartnerPaymentReportsService,
        private _loadingService: LoadingService,
        private _router: Router,
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes.partnerId && changes.partnerId.currentValue) {
            this.model.loadTotalPayments(
                changes.partnerId.currentValue,
                this.rangeStart,
                this.rangeEnd
            );
        }
    }

    get canDownloadReport(): boolean {
        let canDownloadReport: boolean = true;
        switch (this.model.selectedReportType) {
            case this.model.REPORT_TYPES.APPLIED_PAYMENTS:
                canDownloadReport =
                    this.model.totalPartnerAppliedPayments === 0 ? false : true;
                break;
            case this.model.REPORT_TYPES.PENDING_PAYMENTS:
                canDownloadReport =
                    this.model.totalPartnerPendingPayments === 0 ? false : true;
                break;
        }
        return canDownloadReport;
    }

    get contentTypeName(): string {
        return this.totalPartnerPayments === 1 ? 'Recibo' : 'Recibos';
    }

    get description(): string {
        let description: string = '';
        let label: string = '';
        switch (this.model.selectedReportType) {
            case this.model.REPORT_TYPES.APPLIED_PAYMENTS:
                label =
                    this.model.totalPartnerAppliedPayments === 1
                        ? 'Recibo Aplicado'
                        : 'Recibos Aplicados';
                description =
                    this.model.totalPartnerAppliedPayments + ' ' + label;
                break;
            case this.model.REPORT_TYPES.PENDING_PAYMENTS:
                label =
                    this.model.totalPartnerPendingPayments === 1
                        ? 'Recibo Pendiente'
                        : 'Recibos Pendientes';
                description =
                    this.model.totalPartnerPendingPayments + ' ' + label;
                break;
        }
        return description;
    }

    get title(): string {
        let title: string = '';
        switch (this.model.selectedReportType) {
            case this.model.REPORT_TYPES.APPLIED_PAYMENTS:
                title = 'Recibos Aplicados';
                break;
            case this.model.REPORT_TYPES.PENDING_PAYMENTS:
                title = 'Recibos Pendientes';
                break;
        }
        return title;
    }

    get totalPartnerPayments(): number {
        return (
            this.model.totalPartnerAppliedPayments +
            this.model.totalPartnerPendingPayments
        );
    }

    downloadReport(formatType: number): void {
        this._loadingService.show();
        this.model
            .downloadReport(
                this.partnerId,
                this.rangeStart,
                this.rangeEnd,
                formatType
            )
            .then(() => {
                this._loadingService.hide();
            });
    }

    selectRoute(): void {
        const formattedRangeStart = this.rangeStart.split('/').join('-');
        const formattedRangeEnd = this.rangeEnd.split('/').join('-');
        const route: string = (this.selectedReportType === REPORT_TYPES.PENDING_PAYMENTS ) 
        ? PARTNERS_ROUTES.MODULE + '/' + PARTNERS_ROUTES.PAYMENTS_PENDING_BY_RANGE(this.partnerId.toString(), formattedRangeStart, formattedRangeEnd)
        : '';//ROUTES_NAME.contactReceiptsAppliedByRange(this.partnerId, formattedRangeStart, formattedRangeEnd);
        this._router.navigateByUrl(route);
    }

    selectReportType(reportType: number): void {
        this.model.selectedReportType = reportType;
    }

    showModalToSelectReportFormat(): void {
        ModalPlugin.show(this.modalIdSelectReportFormat);
    }
}
