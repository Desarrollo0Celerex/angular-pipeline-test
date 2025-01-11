import { Component, Input } from '@angular/core';
import { CardReportIssuedPoliciesService } from './card-report-issued-policies.service';
import { LoadingService } from '@core/services/loading/loading.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-card-report-issued-policies',
    templateUrl: './card-report-issued-policies.component.html',
    styles: [],
    providers: [CardReportIssuedPoliciesService],
    standalone: false
})
export class CardReportIssuedPoliciesComponent {
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';
    @Input() specialFilter: string = '';
    modalIdSelectReportFormat: string = 'agt-select-report-format';

    constructor(
        public model: CardReportIssuedPoliciesService,
        private _loadingService: LoadingService
    ) {}

    downloadReport(formatType: number): void {
        this._loadingService.show();
        this.model
            .downloadReport(
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
