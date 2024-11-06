import { Component, Input } from '@angular/core';
import { LoadingService } from '@core/services/loading/loading.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-card-report-in-progress-tasks',
    templateUrl: './card-report-in-progress-tasks.component.html',
    styles: [],
})
export class CardReportInProgressTasksComponent {
    @Input() rangeField: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';
    @Input() specialFilter: string = '';
    modalIdSelectReportFormat: string = 'agt-select-report-format';

    constructor(private _loadingService: LoadingService) {}

    downloadReport(formatType: number): void {
        /* this._loadingService.show();
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
            }); */
    }

    showModalToSelectReportFormat(): void {
        ModalPlugin.show(this.modalIdSelectReportFormat);
    }
}
