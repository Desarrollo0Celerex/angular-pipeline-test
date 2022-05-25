import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CardPartnerRenewalProgressService } from './card-partner-renewal-progress.service';

declare var ChartPlugin: any;

@Component({
  selector: 'agt-card-partner-renewal-progress',
  templateUrl: './card-partner-renewal-progress.component.html',
  styles: [
  ],
  providers: [CardPartnerRenewalProgressService]
})
export class CardPartnerRenewalProgressComponent implements OnChanges {
    @Input() partnerId: number = 0;

    constructor(public model: CardPartnerRenewalProgressService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.partnerId && changes.partnerId.currentValue) {
            ChartPlugin.removeChartRenewalProcess();
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
        this.model.loadChartData(partnerId).subscribe(() => {
            ChartPlugin.drawChartRenewalProcess(this.model.chartData);
        })
    }

}
