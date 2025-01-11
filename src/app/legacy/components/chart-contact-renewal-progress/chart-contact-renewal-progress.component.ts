import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ChartContactRenewalProgressService } from './chart-contact-renewal-progress.service';

declare var ChartPlugin: any;

@Component({
    selector: 'agt-chart-contact-renewal-progress',
    templateUrl: './chart-contact-renewal-progress.component.html',
    styles: [],
    providers: [ChartContactRenewalProgressService],
    standalone: false
})
export class ChartContactRenewalProgressComponent implements OnChanges {
    @Input() contactId: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';

    constructor(public model: ChartContactRenewalProgressService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contactId && changes.contactId.currentValue) {
            ChartPlugin.removeChartRenewalProcess();
            this.loadChartData(changes.contactId.currentValue);
        }
    }

    get canShowChart(): boolean {
        return (this.model.chartData !== null) ? true : false;
    }

    /**
     * Load the chart data
     * @param contactId The contact ID
     */
    private loadChartData(contactId: string): void {
        this.model.loadChartData(contactId, this.rangeStart, this.rangeEnd).subscribe(() => {
            ChartPlugin.drawChartRenewalProcess(this.model.chartData);
        })
    }
}
