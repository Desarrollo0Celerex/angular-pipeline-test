import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    OnInit,
    SimpleChanges,
} from '@angular/core';

import { ChartPieData } from '@interfaces/chart-pie-data.interface';

declare var StatsGlobalPlugin: any;
declare var PopoverPlugin: any;

@Component({
    selector: 'agt-chart-contact-types',
    templateUrl: './chart-contact-types.component.html',
    styles: [],
    standalone: false
})
export class ChartContactTypesComponent implements OnChanges, OnInit {
    @Input() description: string = '';
    @Input() data: ChartPieData[] | null = null;
    @Output() showModal: EventEmitter<void> = new EventEmitter<void>();

    constructor() {}

    get canShowChart(): boolean {
        return this.data ? true : false;
    }

    ngOnChanges(changes: SimpleChanges): void {
        StatsGlobalPlugin.removeChartContactTypes();
        if (changes.data.currentValue) {
            if (changes.data.currentValue.length > 0) {
                this._loadCharData(changes.data.currentValue);
            } else {
                this._loadCharData([]);
            }
        }
    }

    ngOnInit(): void {
        PopoverPlugin.init();
    }

    showModalToApplyFilter(): void {
        this.showModal.emit();
    }

    private _loadCharData(chartPieData: ChartPieData[]): void {
        const chartData: any[] = [];
        chartData.push(['Tipo', 'Pólizas']);
        for (let data of chartPieData) {
            chartData.push([data.name, data.value]);
        }
        StatsGlobalPlugin.drawChartContactTypes(chartData);
    }
}
