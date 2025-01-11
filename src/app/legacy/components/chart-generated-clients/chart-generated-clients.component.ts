import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { StatRangeData } from '@interfaces/stat-range-data.interface';

declare var StatsClientsPlugin: any;

import { ChartGeneratedClientsService } from './chart-generated-clients.service';

@Component({
    selector: 'agt-chart-generated-clients',
    templateUrl: './chart-generated-clients.component.html',
    styles: [],
    providers: [ChartGeneratedClientsService],
    standalone: false
})
export class ChartGeneratedClientsComponent implements OnChanges {
    @Input() range: ComparisonRangeData | null = null;

    constructor(private _chartGeneratedClientsService: ChartGeneratedClientsService) { }

    ngOnChanges(changes: SimpleChanges): void {
        StatsClientsPlugin.removeChartClientsGenerated();
        this._loadClientsGeneratedStats(changes.range.currentValue);
    }

    get model(): ChartGeneratedClientsService {
        return this._chartGeneratedClientsService;
    }

    get canShowClientsGeneratedStats(): boolean {
        return (this.model.clientsGeneratedStatsData.length > 0) ? true : false;
    }

    private _loadClientsGeneratedStats(range: ComparisonRangeData): void {
        this.model.getClientsGeneratedStats(range).subscribe((clientsGeneratedStats: StatRangeData[][]) => {
            this.model.loadClientsGeneratedStatsData(clientsGeneratedStats);
            StatsClientsPlugin.drawChartClientsGenerated(this.model.clientsGeneratedStatsData);
        });
    }

}
