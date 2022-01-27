import { Component, Input } from '@angular/core';

import { LoadingService } from '@services/loading.service';

import { CardReportPendingReceiptsService } from './card-report-pending-receipts.service';

@Component({
  selector: 'agt-card-report-pending-receipts',
  templateUrl: './card-report-pending-receipts.component.html',
  styles: [
  ],
  providers: [CardReportPendingReceiptsService]
})
export class CardReportPendingReceiptsComponent {
    @Input() rangeField: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';

    constructor(
        public model: CardReportPendingReceiptsService,
        private _loadingService: LoadingService
    ) { }

    downloadReport(): void {
        this._loadingService.show();
        this.model.downloadReport(this.rangeField, this.rangeStart, this.rangeEnd).then(() => {
            this._loadingService.hide();
        });
    }
}
