import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { ChartContactWalletProjectionService } from './chart-contact-wallet-projection.service';

declare var ChartPlugin: any;
declare var PopoverPlugin: any;

@Component({
  selector: 'agt-chart-contact-wallet-projection',
  templateUrl: './chart-contact-wallet-projection.component.html',
  styles: [
  ],
  providers: [ChartContactWalletProjectionService]
})
export class ChartContactWalletProjectionComponent implements OnChanges, OnInit {
    @Input() contactId: string = '';

    constructor(public model: ChartContactWalletProjectionService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contactId && changes.contactId.currentValue) {
            ChartPlugin.removeWalletProjection();
            this._loadChartData(changes.contactId.currentValue);
        }
    }

    ngOnInit(): void {
        PopoverPlugin.init();
    }

    get canShowChart(): boolean {
        return (this.model.chartData !== null) ? true : false;
    }

    /**
     * Load the chart data
     * @param contactId The contact ID
     */
    private _loadChartData(contactId: string): void {
        this.model.loadChartData(contactId).subscribe(() => {
            ChartPlugin.drawWalletProjection(this.model.chartData);
        })
    }
}
