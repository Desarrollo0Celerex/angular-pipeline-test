import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { LoadingService } from '@core/services/loading.service';

import { CardGroupRenewalReportsService } from './card-group-renewal-reports.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-card-group-renewal-reports',
    templateUrl: './card-group-renewal-reports.component.html',
    styles: [],
    providers: [CardGroupRenewalReportsService],
})
export class CardGroupRenewalReportsComponent implements OnChanges {
    @Input() groupId: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';
    modalIdSelectReportFormat: string = 'cprr-modal-select-report-format';

    constructor(
        public model: CardGroupRenewalReportsService,
        private _loadingService: LoadingService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes.groupId && changes.groupId.currentValue) {
            this.model.loadTotalRenewals(
                changes.groupId.currentValue,
                this.rangeStart,
                this.rangeEnd
            );
        }
    }
    get canDownloadReport(): boolean {
        let canDownloadReport: boolean = true;
        switch (this.model.selectedReportType) {
            case this.model.REPORT_TYPES.APPLIED_RENEWALS:
                canDownloadReport =
                    this.model.totalGroupAppliedRenewals === 0 ? false : true;
                break;
            case this.model.REPORT_TYPES.PENDING_RENEWALS:
                canDownloadReport =
                    this.model.totalGroupPendingRenewals === 0 ? false : true;
                break;
        }
        return canDownloadReport;
    }

    get contentTypeName(): string {
        return this.totalGroupRenewals === 1 ? 'Póliza' : 'Pólizas';
    }

    get description(): string {
        let description: string = '';
        let label: string = '';
        switch (this.model.selectedReportType) {
            case this.model.REPORT_TYPES.APPLIED_RENEWALS:
                label =
                    this.model.totalGroupAppliedRenewals === 1
                        ? 'Renovación Aplicada'
                        : 'Renovaciones Aplicadas';
                description =
                    this.model.totalGroupAppliedRenewals + ' ' + label;
                break;
            case this.model.REPORT_TYPES.PENDING_RENEWALS:
                label =
                    this.model.totalGroupPendingRenewals === 1
                        ? 'Renovación Pendiente'
                        : 'Renovaciones Pendientes';
                description =
                    this.model.totalGroupPendingRenewals + ' ' + label;
                break;
        }
        return description;
    }

    get title(): string {
        let title: string = '';
        switch (this.model.selectedReportType) {
            case this.model.REPORT_TYPES.APPLIED_RENEWALS:
                title = 'Renovaciones Aplicadas';
                break;
            case this.model.REPORT_TYPES.PENDING_RENEWALS:
                title = 'Renovaciones Pendientes';
                break;
        }
        return title;
    }

    get totalGroupRenewals(): number {
        return (
            this.model.totalGroupAppliedRenewals +
            this.model.totalGroupPendingRenewals
        );
    }

    downloadReport(formatType: number): void {
        this._loadingService.show();
        this.model
            .downloadReport(
                this.groupId,
                this.rangeStart,
                this.rangeEnd,
                formatType
            )
            .then(() => {
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
