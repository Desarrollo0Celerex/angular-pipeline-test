import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ChartPartnerPaymentProgressService } from './chart-partner-payment-progress.service';

declare var ChartPlugin: any;

@Component({
    selector: 'agt-chart-partner-payment-progress',
    templateUrl: './chart-partner-payment-progress.component.html',
    styles: [],
    providers: [ChartPartnerPaymentProgressService],
    standalone: false
})
export class ChartPartnerPaymentProgressComponent implements OnChanges {
    @Input() partnerId: number = 0;
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';

    constructor(public model: ChartPartnerPaymentProgressService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.partnerId && changes.partnerId.currentValue) {
            ChartPlugin.removeChartPaymentProcess();
            this.loadChartData(changes.partnerId.currentValue);
        }
    }

    get canShowChart(): boolean {
        return (this.model.chartData !== null) ? true : false;
    }

    /**
     * Load the chart data
     * @param partnerId The partner ID
     */
    private loadChartData(partnerId: number): void {
        this.model.loadChartData(partnerId, this.rangeStart, this.rangeEnd).subscribe(() => {
            ChartPlugin.drawChartPaymentProcess(this.model.chartData);
        })
    }

}
