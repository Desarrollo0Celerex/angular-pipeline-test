import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { StatRangeData } from '@interfaces/stat-range-data.interface';

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
    @Input() range: ComparisonRangeData | null = null;

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

    private _loadQuotationsStats(range: ComparisonRangeData): void {
        this.model.getQuotationsStats(range).subscribe((quotationsStats: StatRangeData[][]) => {
            this.model.loadQuotationsStatsData(quotationsStats);
            StatsLeadsPlugin.drawChartQuotations(this.model.quotationsStatsData);
        });
    }

}
