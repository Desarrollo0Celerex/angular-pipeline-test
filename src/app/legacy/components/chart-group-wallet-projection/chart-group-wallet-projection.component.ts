import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { ChartGroupWalletProjectionService } from './chart-group-wallet-projection.service';

declare var ChartPlugin: any;
declare var PopoverPlugin: any;

@Component({
    selector: 'agt-chart-group-wallet-projection',
    templateUrl: './chart-group-wallet-projection.component.html',
    styles: [],
    providers: [ChartGroupWalletProjectionService],
    standalone: false
})
export class ChartGroupWalletProjectionComponent implements OnChanges, OnInit {
    @Input() groupId: string = '';

    constructor(public model: ChartGroupWalletProjectionService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.groupId && changes.groupId.currentValue) {
            ChartPlugin.removeWalletProjection();
            this._loadChartData(changes.groupId.currentValue);
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
     * @param groupId The contact ID
     */
    private _loadChartData(groupId: string): void {
        this.model.loadChartData(groupId).subscribe(() => {
            ChartPlugin.drawWalletProjection(this.model.chartData);
        })
    }
}
