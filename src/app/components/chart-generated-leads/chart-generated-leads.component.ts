import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { RangeData } from '@interfaces/range-data.interface';
import { RangeStat } from '@interfaces/range-stat.interface';

import { ChartGeneratedLeadsService } from './chart-generated-leads.service';

declare var StatsLeadsPlugin: any;

@Component({
  selector: 'agt-chart-generated-leads',
  templateUrl: './chart-generated-leads.component.html',
  styles: [
  ],
  providers: [ChartGeneratedLeadsService]
})
export class ChartGeneratedLeadsComponent implements OnChanges {
    @Input() range: RangeData | null = null;

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

    private _loadLeadsGeneratedStats(range: RangeData): void {
        this.model.getLeadsGeneratedStats(range).subscribe((leadsGeneratedStats: RangeStat[][]) => {
            this.model.loadLeadsGeneratedStatsData(leadsGeneratedStats);
            StatsLeadsPlugin.drawChartLeadsGenerated(this.model.leadsGeneratedStatsData);
        });
    }

}
