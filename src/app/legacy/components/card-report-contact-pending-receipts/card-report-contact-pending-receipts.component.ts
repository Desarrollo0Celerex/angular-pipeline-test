import { Component, Input } from '@angular/core';

import { LoadingService } from '@core/services/loading.service';

import { CardReportContactPendingReceiptsService } from './card-report-contact-pending-receipts.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-card-report-contact-pending-receipts',
    templateUrl: './card-report-contact-pending-receipts.component.html',
    styles: [],
    providers: [CardReportContactPendingReceiptsService],
})
export class CardReportContactPendingReceiptsComponent {
    @Input() contactId: string = '';
    @Input() rangeField: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';
    @Input() specialFilter: string = '';
    modalIdSelectReportFormat: string = 'agt-select-report-format';

    constructor(
        public model: CardReportContactPendingReceiptsService,
        private _loadingService: LoadingService
    ) {}

    downloadReport(formatType: number): void {
        this._loadingService.show();
        this.model
            .downloadReport(
                this.contactId,
                this.rangeField,
                this.rangeStart,
                this.rangeEnd,
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
