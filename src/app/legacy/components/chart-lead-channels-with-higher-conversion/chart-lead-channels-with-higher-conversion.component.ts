import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { Stat } from '@interfaces/stat.interface';

import { ChartLeadChannelsWithHigherConversionService } from './chart-lead-channels-with-higher-conversion.service';

declare var StatsLeadsPlugin: any;

@Component({
  selector: 'agt-chart-lead-channels-with-higher-conversion',
  templateUrl: './chart-lead-channels-with-higher-conversion.component.html',
  styles: [
  ],
  providers: [ChartLeadChannelsWithHigherConversionService]
})
export class ChartLeadChannelsWithHigherConversionComponent implements OnChanges {
    @Input() range: ComparisonRangeData | null = null;

    constructor(private _chartLeadChannelsWithHigherConversionService: ChartLeadChannelsWithHigherConversionService) { }

    ngOnChanges(changes: SimpleChanges): void {
        StatsLeadsPlugin.removeChartContactSourcesQuotations();
        this._loadContactSourcesQuotationsStats(changes.range.currentValue);
    }

    get model(): ChartLeadChannelsWithHigherConversionService {
        return this._chartLeadChannelsWithHigherConversionService;
    }

    get canShowContactSourcesQuotationsStats(): boolean {
        return (this.model.contactSourcesQuotationsStatsData.length > 0) ? true : false;
    }

    private _loadContactSourcesQuotationsStats(range: ComparisonRangeData): void {
        this.model.getContactSourcesQuotationsStats(range).subscribe((res: Stat[][]) => {
            this.model.loadContactSourcesQuotationsStatsData(res);
            StatsLeadsPlugin.drawChartContactSourcesQuotations(this.model.contactSourcesQuotationsStatsData);
        });
    }

}
