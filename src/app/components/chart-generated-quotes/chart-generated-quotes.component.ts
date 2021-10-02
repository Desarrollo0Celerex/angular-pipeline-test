import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { RangeData } from '@interfaces/range-data.interface';
import { RangeStat } from '@interfaces/range-stat.interface';

import { ChartGeneratedQuotesService } from './chart-generated-quotes.service';

declare var StatsLeadsPlugin: any;

@Component({
  selector: 'agt-chart-generated-quotes',
  templateUrl: './chart-generated-quotes.component.html',
  styles: [
  ],
  providers: [ChartGeneratedQuotesService]
})
export class ChartGeneratedQuotesComponent implements OnChanges {
    @Input() range: RangeData | null = null;

    constructor(private _chartGeneratedQuotesService: ChartGeneratedQuotesService) { }

    ngOnInit(): void {

    }
    ngOnChanges(changes: SimpleChanges): void {
        StatsLeadsPlugin.removeChartQuotations();
        this._loadQuotationsStats(changes.range.currentValue);
    }

    get model(): ChartGeneratedQuotesService {
        return this._chartGeneratedQuotesService;
    }

    get canShowQuotationsStats(): boolean {
        return (this.model.quotationsStatsData.length > 0) ? true : false;
    }

    private _loadQuotationsStats(range: RangeData): void {
        this.model.getQuotationsStats(range).subscribe((quotationsStats: RangeStat[][]) => {
            this.model.loadQuotationsStatsData(quotationsStats);
            StatsLeadsPlugin.drawChartQuotations(this.model.quotationsStatsData);
        });
    }

}
