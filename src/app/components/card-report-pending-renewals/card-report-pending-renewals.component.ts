import { Component, Input } from '@angular/core';

import { LoadingService } from '@services/loading.service';

import { CardReportPendingRenewalsService } from './card-report-pending-renewals.service';

@Component({
  selector: 'agt-card-report-pending-renewals',
  templateUrl: './card-report-pending-renewals.component.html',
  styles: [
  ],
  providers: [CardReportPendingRenewalsService]
})
export class CardReportPendingRenewalsComponent {
    @Input() rangeField: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';

    constructor(
        public model: CardReportPendingRenewalsService,
        private _loadingService: LoadingService
    ) { }

    downloadReport(): void {
        this._loadingService.show();
        this.model.downloadReport(this.rangeField, this.rangeStart, this.rangeEnd).then(() => {
            this._loadingService.hide();
        });
    }

}
