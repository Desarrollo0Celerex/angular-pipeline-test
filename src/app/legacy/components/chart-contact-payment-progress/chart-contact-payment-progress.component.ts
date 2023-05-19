import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ChartContactPaymentProgressService } from './chart-contact-payment-progress.service';

declare var ChartPlugin: any;

@Component({
  selector: 'agt-chart-contact-payment-progress',
  templateUrl: './chart-contact-payment-progress.component.html',
  styles: [
  ],
  providers: [ChartContactPaymentProgressService]
})
export class ChartContactPaymentProgressComponent implements OnChanges {
    @Input() contactId: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';

    constructor(public model: ChartContactPaymentProgressService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contactId && changes.contactId.currentValue) {
            ChartPlugin.removeChartPaymentProcess();
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
            ChartPlugin.drawChartPaymentProcess(this.model.chartData);
        })
    }
}
