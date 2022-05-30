import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { ChartGroupWalletProjectionService } from './chart-group-wallet-projection.service';

declare var ChartPlugin: any;
declare var PopoverPlugin: any;
declare var TooltipPlugin: any;

@Component({
  selector: 'agt-chart-group-wallet-projection',
  templateUrl: './chart-group-wallet-projection.component.html',
  styles: [
  ],
  providers: [ChartGroupWalletProjectionService]
})
export class ChartGroupWalletProjectionComponent implements OnInit {
    @Input() groupId: string = '';
    canShowChart: boolean = false;

    constructor(public model: ChartGroupWalletProjectionService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.groupId && changes.groupId.currentValue) {
            this._loadChartData(changes.groupId.currentValue);
        }
    }

    ngOnInit(): void {
        PopoverPlugin.init();
    }

    /**
     * Load the chart data
     * @param groupId The contact ID
     */
    private _loadChartData(groupId: string): void {
        this.model.loadChartData(groupId).subscribe(() => {
            this.canShowChart = true;
            ChartPlugin.drawWalletProjection(this.model.chartData);
            TooltipPlugin.init();
        })
    }
}
