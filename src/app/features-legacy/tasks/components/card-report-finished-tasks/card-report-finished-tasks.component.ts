import { Component, Input } from '@angular/core';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { LoadingService } from '@core/services/loading/loading.service';
import { TaskService } from '@features-legacy/tasks/services/task.service';
import { saveAs } from 'file-saver';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-card-report-finished-tasks',
    templateUrl: './card-report-finished-tasks.component.html',
    styles: [],
    standalone: false
})
export class CardReportFinishedTasksComponent {
    @Input() filters: number[] = [];
    @Input() rangeField: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';
    @Input() specialFilter: string = '';
    modalIdSelectReportFormat: string = 'agt-select-report-format';

    constructor(
        private _loadingService: LoadingService,
        private _taskService: TaskService
    ) {}

    downloadReport(formatType: number): void {
        this._loadingService.show();
        const filter = UtilitiesHelper.generateHttpFilter(
            'taskStatusId',
            this.filters
        );
        this._downloadReport(
            filter,
            this.rangeField,
            this.rangeStart,
            this.rangeEnd,
            this.specialFilter,
            formatType
        ).then(() => {
            this._loadingService.hide();
        });
    }

    showModalToSelectReportFormat(): void {
        ModalPlugin.show(this.modalIdSelectReportFormat);
    }

    private _downloadReport(
        filter: string,
        rangeField: string,
        rangeStart: string,
        rangeEnd: string,
        specialFilter: string,
        formatType: number
    ): Promise<void> {
        return new Promise((resolve) => {
            const sortBy: string = 'taskFinishedDate';
            this._taskService
                .downloadFinishedTasksReport(
                    filter,
                    rangeField,
                    rangeStart,
                    rangeEnd,
                    sortBy,
                    specialFilter,
                    formatType
                )
                .then((response: any) => {
                    const filename = response.headers
                        .get('content-disposition')
                        .split(';')[1]
                        .split('filename')[1]
                        .split('=')[1]
                        .split('"')[1]
                        .trim();
                    const blob = new Blob([response.body], {
                        type: response.type.toString(),
                    });
                    saveAs(blob, filename);
                    resolve();
                });
        });
    }
}
