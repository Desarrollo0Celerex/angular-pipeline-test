import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';

import { ChartPieData } from '@interfaces/chart-pie-data.interface';

declare var StatsGlobalPlugin: any;

@Component({
  selector: 'agt-chart-insurances',
  templateUrl: './chart-insurances.component.html',
  styles: [
  ]
})
export class ChartInsurancesComponent implements OnChanges {
    @Input() description: string = '';
    @Input() data: ChartPieData[] = [];
    @Output() showModal: EventEmitter<void> = new EventEmitter<void>();

    constructor() { }

    get canShowChart(): boolean {
        return (this.data.length > 0) ? true : false;
    }

    ngOnChanges(changes: SimpleChanges): void {
        StatsGlobalPlugin.removeChartInsurances();
        if(changes.data.currentValue.length > 0) {
            this._loadCharData(changes.data.currentValue);
        }
    }

    showModalToApplyFilter(): void {
        this.showModal.emit();
    }

    private _loadCharData(chartPieData: ChartPieData[]): void {
        const chartData: any[] = [];
        chartData.push(['Ramos', 'Pólizas']);
        for(let data of chartPieData) {
            chartData.push([
                data.name,
                data.value
            ]);
        }
        StatsGlobalPlugin.drawChartInsurances(chartData);
    }
}
