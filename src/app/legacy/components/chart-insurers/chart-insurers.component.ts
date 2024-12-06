import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';

import { ChartPieData } from '@interfaces/chart-pie-data.interface';

declare var StatsGlobalPlugin: any;

@Component({
    selector: 'agt-chart-insurers',
    templateUrl: './chart-insurers.component.html',
    styles: [],
})
export class ChartInsurersComponent implements OnChanges {
    @Input() data: ChartPieData[] | null = null;
    @Output() showModal: EventEmitter<void> = new EventEmitter<void>();

    constructor() {}

    get canShowChart(): boolean {
        return this.data ? true : false;
    }

    ngOnChanges(changes: SimpleChanges): void {
        StatsGlobalPlugin.removeChartInsurers();
        if (changes.data.currentValue) {
            if (changes.data.currentValue.length > 0) {
                this._loadCharData(changes.data.currentValue);
            } else {
                this._loadCharData([]);
            }
        }
    }

    showModalToApplyFilter(): void {
        this.showModal.emit();
    }

    private _loadCharData(chartPieData: ChartPieData[]): void {
        const chartData: any[] = [];
        chartData.push(['Aseguradora', 'Pólizas']);
        for (let data of chartPieData) {
            chartData.push([data.name, data.value]);
        }
        StatsGlobalPlugin.drawChartInsurers(chartData);
    }
}
