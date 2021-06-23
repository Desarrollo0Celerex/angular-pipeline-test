import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CardActiveCoveragesService } from './card-active-coverages.service';

declare var ChartPlugin: any;

@Component({
  selector: 'agt-card-active-coverages',
  templateUrl: './card-active-coverages.component.html',
  styles: [
  ],
  providers: [CardActiveCoveragesService]
})
export class CardActiveCoveragesComponent implements OnChanges {
    @Input() contactId: string = '';
    canShowChart: boolean = false;

    constructor(public cardActiveCoveragesService: CardActiveCoveragesService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contactId && changes.contactId.currentValue) {
            this.loadChartData(changes.contactId.currentValue);
        }
    }

    /**
     * Load the chart data
     * @param contactId The contact ID
     */
    private loadChartData(contactId: string): void {
        this.cardActiveCoveragesService.loadChartData(contactId).subscribe(() => {
            this.canShowChart = true;
            ChartPlugin.drawActiveCoverages(this.cardActiveCoveragesService.chartData);
        })
    }

}
