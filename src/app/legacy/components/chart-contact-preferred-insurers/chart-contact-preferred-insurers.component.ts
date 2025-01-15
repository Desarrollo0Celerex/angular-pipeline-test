import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ChartContactPreferredInsurersService } from './chart-contact-preferred-insurers.service';

declare var ChartPlugin: any;

@Component({
    selector: 'agt-chart-contact-preferred-insurers',
    templateUrl: './chart-contact-preferred-insurers.component.html',
    styles: [],
    providers: [ChartContactPreferredInsurersService],
    standalone: false
})
export class ChartContactPreferredInsurersComponent implements OnChanges {
    @Input() contactId: string = '';
    canShowChart: boolean = false;

    constructor(public cardPreferredInsurersService: ChartContactPreferredInsurersService) { }

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
