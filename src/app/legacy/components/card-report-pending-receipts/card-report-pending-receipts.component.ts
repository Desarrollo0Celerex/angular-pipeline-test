import { Component, Input } from '@angular/core';

import { LoadingService } from '@core/services/loading/loading.service';

import { CardReportPendingReceiptsService } from './card-report-pending-receipts.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-card-report-pending-receipts',
    templateUrl: './card-report-pending-receipts.component.html',
    styles: [],
    providers: [CardReportPendingReceiptsService],
})
export class CardReportPendingReceiptsComponent {
    @Input() rangeField: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';
    @Input() specialFilter: string = '';
    modalIdSelectReportFormat: string = 'agt-select-report-format';

    constructor(
        public model: CardReportPendingReceiptsService,
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
