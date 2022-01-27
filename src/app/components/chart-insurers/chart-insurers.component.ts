import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ChartPieData } from '@interfaces/chart-pie-data.interface';

declare var StatsGlobalPlugin: any;

@Component({
  selector: 'agt-chart-insurers',
  templateUrl: './chart-insurers.component.html',
  styles: [
  ]
})
export class ChartInsurersComponent implements OnChanges {
    @Input() description: string = '';
    @Input() data: ChartPieData[] = [];
    chartData: any[] = [];

    constructor() { }

    get canShowChart(): boolean {
        return (this.chartData.length > 0) ? true : false;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.data && !!changes.data.currentValue) {
            this._loadCharData(changes.data.currentValue);
        }
    }

    private _loadCharData(chartData: ChartPieData[]): void {
        this.chartData = [];
        this.chartData.push(['Aseguradora', 'Pólizas']);
        for(let data of chartData) {
            this.chartData.push([
                data.name,
                data.value
            ]);
        }
        StatsGlobalPlugin.drawChartInsurers(this.chartData);
    }
}
