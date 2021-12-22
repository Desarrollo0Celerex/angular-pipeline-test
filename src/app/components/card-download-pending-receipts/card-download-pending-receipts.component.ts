import { Component, Input } from '@angular/core';

import { StatsPeriodData } from '@interfaces/stats-period-data.interface';
import { LoadingService } from '@services/loading.service';

import { CardDownloadPendingReceiptsService } from './card-download-pending-receipts.service';

@Component({
  selector: 'agt-card-download-pending-receipts',
  templateUrl: './card-download-pending-receipts.component.html',
  styles: [
  ],
  providers: [CardDownloadPendingReceiptsService]
})
export class CardDownloadPendingReceiptsComponent {
    @Input() statsPeriodData: StatsPeriodData | null = null;

    constructor(
        public model: CardDownloadPendingReceiptsService,
        private _loadingService: LoadingService
    ) { }

    downloadReport(): void {
        if(!!this.statsPeriodData) {
            this._loadingService.show();
            this.model.downloadPendingReceiptsReport(this.statsPeriodData.startDate, this.statsPeriodData.endDate).then(() => {
                this._loadingService.hide();
            })
        }
    }

}
