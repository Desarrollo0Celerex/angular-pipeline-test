import { Component, Input } from '@angular/core';

import { LoadingService } from '@core/services/loading.service';

import { CardReportRenewedPoliciesService } from './card-report-renewed-policies.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-card-report-renewed-policies',
    templateUrl: './card-report-renewed-policies.component.html',
    styles: [],
    providers: [CardReportRenewedPoliciesService],
})
export class CardReportRenewedPoliciesComponent {
    @Input() rangeField: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';
    @Input() specialFilter: string = '';
    modalIdSelectReportFormat: string = 'agt-select-report-format';

    constructor(
        public model: CardReportRenewedPoliciesService,
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
