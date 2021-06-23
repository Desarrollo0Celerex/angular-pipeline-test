import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CardPreferredInsurersService } from './card-preferred-insurers.service';

declare var ChartPlugin: any;

@Component({
  selector: 'agt-card-preferred-insurers',
  templateUrl: './card-preferred-insurers.component.html',
  styles: [
  ],
  providers: [CardPreferredInsurersService]
})
export class CardPreferredInsurersComponent implements OnChanges {
    @Input() contactId: string = '';
    canShowChart: boolean = false;

    constructor(public cardPreferredInsurersService: CardPreferredInsurersService) { }

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
        this.cardPreferredInsurersService.loadChartData(contactId).subscribe(() => {
            this.canShowChart = true;
            ChartPlugin.drawPreferredInsurers(this.cardPreferredInsurersService.chartData);
        })
    }
}
