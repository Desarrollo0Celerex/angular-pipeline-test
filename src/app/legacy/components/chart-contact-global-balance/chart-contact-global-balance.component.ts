import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ChartContactGlobalBalanceService } from './chart-contact-global-balance.service';

declare var ChartPlugin: any;

@Component({
    selector: 'agt-chart-contact-global-balance',
    templateUrl: './chart-contact-global-balance.component.html',
    styles: [],
    providers: [ChartContactGlobalBalanceService],
    standalone: false
})
export class ChartContactGlobalBalanceComponent implements OnChanges {
    @Input() contactId: string = '';
    canShowChart: boolean = false;

    constructor(public cardGlobalBalanceService: ChartContactGlobalBalanceService) { }

    ngOnInit(): void {
    }

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
        this.cardGlobalBalanceService.loadChartData(contactId).subscribe(() => {
            this.canShowChart = true;
            ChartPlugin.drawGlobalBalance(this.cardGlobalBalanceService.chartData);
        })
    }

}
