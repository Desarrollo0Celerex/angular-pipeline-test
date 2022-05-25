import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CardPartnerActiveCoveragesService } from './card-partner-active-coverages.service';

declare var ChartPlugin: any;

@Component({
  selector: 'agt-card-partner-active-coverages',
  templateUrl: './card-partner-active-coverages.component.html',
  styles: [
  ],
  providers: [CardPartnerActiveCoveragesService]
})
export class CardPartnerActiveCoveragesComponent implements OnChanges {
    @Input() partnerId: number = 0;
    canShowChart: boolean = false;

    constructor(public model: CardPartnerActiveCoveragesService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.partnerId && changes.partnerId.currentValue) {
            this.loadChartData(changes.partnerId.currentValue);
        }
    }

    /**
     * Load the chart data
     * @param partnerId The partner ID
     */
    private loadChartData(partnerId: number): void {
        this.model.loadChartData(partnerId).subscribe(() => {
            this.canShowChart = true;
            ChartPlugin.drawActiveCoverages(this.model.chartData);
        })
    }
}
