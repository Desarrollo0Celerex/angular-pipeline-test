import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ChartContactActiveCoveragesService } from './chart-contact-active-coverages.service';

declare var ChartPlugin: any;

@Component({
  selector: 'agt-chart-contact-active-coverages',
  templateUrl: './chart-contact-active-coverages.component.html',
  styles: [
  ],
  providers: [ChartContactActiveCoveragesService]
})
export class ChartContactActiveCoveragesComponent implements OnChanges {
    @Input() contactId: string = '';
    canShowChart: boolean = false;

    constructor(public cardActiveCoveragesService: ChartContactActiveCoveragesService) { }

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
