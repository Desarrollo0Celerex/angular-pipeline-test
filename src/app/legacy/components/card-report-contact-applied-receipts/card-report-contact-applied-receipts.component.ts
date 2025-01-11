import { Component, Input } from '@angular/core';

import { LoadingService } from '@core/services/loading/loading.service';

import { CardReportContactAppliedReceiptsService } from './card-report-contact-applied-receipts.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-card-report-contact-applied-receipts',
    templateUrl: './card-report-contact-applied-receipts.component.html',
    styles: [],
    providers: [CardReportContactAppliedReceiptsService],
    standalone: false
})
export class CardReportContactAppliedReceiptsComponent {
    @Input() contactId: string = '';
    @Input() rangeField: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';
    @Input() specialFilter: string = '';
    modalIdSelectReportFormat: string = 'agt-select-report-format';

    constructor(
        public model: CardReportContactAppliedReceiptsService,
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
