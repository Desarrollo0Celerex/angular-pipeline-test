import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CardPartnerPaymentProgressService } from './card-partner-payment-progress.service';

declare var ChartPlugin: any;

@Component({
  selector: 'agt-card-partner-payment-progress',
  templateUrl: './card-partner-payment-progress.component.html',
  styles: [
  ],
  providers: [CardPartnerPaymentProgressService]
})
export class CardPartnerPaymentProgressComponent implements OnChanges {
    @Input() partnerId: number = 0;
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';

    constructor(public model: CardPartnerPaymentProgressService) { }

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
