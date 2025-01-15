import { Component, Input } from '@angular/core';

import { LoadingService } from '@core/services/loading/loading.service';

import { CardReportPendingRenewalsService } from './card-report-pending-renewals.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-card-report-pending-renewals',
    templateUrl: './card-report-pending-renewals.component.html',
    styles: [],
    providers: [CardReportPendingRenewalsService],
    standalone: false
})
export class CardReportPendingRenewalsComponent {
    @Input() rangeField: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';
    @Input() specialFilter: string = '';
    modalIdSelectReportFormat: string = 'agt-select-report-format';

    constructor(
        public model: CardReportPendingRenewalsService,
        private _loadingService: LoadingService
    ) {}

    downloadReport(formatType: number): void {
        this._loadingService.show();
        this.model
            .downloadReport(
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
