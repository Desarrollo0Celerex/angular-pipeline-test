import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { StatRangeData } from '@interfaces/stat-range-data.interface';

import { ChartGeneratedLeadsService } from './chart-generated-leads.service';

declare var StatsLeadsPlugin: any;

@Component({
    selector: 'agt-chart-generated-leads',
    templateUrl: './chart-generated-leads.component.html',
    styles: [],
    providers: [ChartGeneratedLeadsService],
    standalone: false
})
export class ChartGeneratedLeadsComponent implements OnChanges {
    @Input() range: ComparisonRangeData | null = null;

    constructor(private _chartGeneratedLeadsService: ChartGeneratedLeadsService) { }

    ngOnChanges(changes: SimpleChanges): void {
        StatsLeadsPlugin.removeChartLeadsGenerated();
        this._loadLeadsGeneratedStats(changes.range.currentValue);
    }

    get model(): ChartGeneratedLeadsService {
        return this._chartGeneratedLeadsService;
    }

    get canShowLeadsGeneratedStats(): boolean {
        return (this.model.leadsGeneratedStatsData.length > 0) ? true : false;
    }

    private _loadLeadsGeneratedStats(range: ComparisonRangeData): void {
        this.model.getLeadsGeneratedStats(range).subscribe((leadsGeneratedStats: StatRangeData[][]) => {
            this.model.loadLeadsGeneratedStatsData(leadsGeneratedStats);
            StatsLeadsPlugin.drawChartLeadsGenerated(this.model.leadsGeneratedStatsData);
        });
    }

}
