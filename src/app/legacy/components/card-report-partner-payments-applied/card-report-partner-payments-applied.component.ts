import { Component, Input } from '@angular/core';

import { LoadingService } from '@core/services/loading/loading.service';

import { CardReportPartnerPaymentsAppliedService } from './card-report-partner-payments-applied.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-card-report-partner-payments-applied',
    templateUrl: './card-report-partner-payments-applied.component.html',
    styles: [],
    providers: [CardReportPartnerPaymentsAppliedService],
})
export class CardReportPartnerPaymentsAppliedComponent {
    @Input() partnerId: string = '';
    @Input() rangeField: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';
    @Input() specialFilter: string = '';
    modalIdSelectReportFormat: string = 'agt-select-report-format';

    constructor(
        public model: CardReportPartnerPaymentsAppliedService,
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
