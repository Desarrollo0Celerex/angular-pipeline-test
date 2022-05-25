import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CardPartnerPreferredInsurersService } from './card-partner-preferred-insurers.service';

declare var ChartPlugin: any;

@Component({
  selector: 'agt-card-partner-preferred-insurers',
  templateUrl: './card-partner-preferred-insurers.component.html',
  styles: [
  ],
  providers: [CardPartnerPreferredInsurersService]
})
export class CardPartnerPreferredInsurersComponent implements OnChanges {
    @Input() partnerId: number = 0;
    canShowChart: boolean = false;

    constructor(public model: CardPartnerPreferredInsurersService) { }

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
            ChartPlugin.drawPreferredInsurers(this.model.chartData);
        })
    }

}
