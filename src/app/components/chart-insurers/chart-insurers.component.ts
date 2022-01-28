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

    constructor() { }

    get canShowChart(): boolean {
        return (this.data.length > 0) ? true : false;
    }

    ngOnChanges(changes: SimpleChanges): void {
        StatsGlobalPlugin.removeChartInsurers();
        if(changes.data.currentValue.length > 0) {
            this._loadCharData(changes.data.currentValue);
        }
    }

    private _loadCharData(chartPieData: ChartPieData[]): void {
        const chartData: any[] = [];
        chartData.push(['Aseguradora', 'Pólizas']);
        for(let data of chartPieData) {
            chartData.push([
                data.name,
                data.value
            ]);
        }
        StatsGlobalPlugin.drawChartInsurers(chartData);
    }
}
