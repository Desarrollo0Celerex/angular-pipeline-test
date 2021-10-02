import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { RangeData } from '@interfaces/range-data.interface';
import { Stat } from '@interfaces/stat.interface';

import { ChartLeadAcquisitionChannelsService } from './chart-lead-acquisition-channels.service';

declare var StatsLeadsPlugin: any;

@Component({
  selector: 'agt-chart-lead-acquisition-channels',
  templateUrl: './chart-lead-acquisition-channels.component.html',
  styles: [
  ],
  providers: [ChartLeadAcquisitionChannelsService]
})
export class ChartLeadAcquisitionChannelsComponent implements OnChanges {
    @Input() range: RangeData | null = null;

    constructor(private _chartLeadAcquisitionChannelsService: ChartLeadAcquisitionChannelsService) { }

    ngOnChanges(changes: SimpleChanges): void {
        StatsLeadsPlugin.removeChartContactSources();
        this._loadContactSourcesStats(changes.range.currentValue);
    }

    get model(): ChartLeadAcquisitionChannelsService {
        return this._chartLeadAcquisitionChannelsService;
    }

    get canShowContactSourcesStats(): boolean {
        return (this.model.contactSourcesStatsData.length > 0) ? true : false;
    }

    private _loadContactSourcesStats(range: RangeData): void {
        this.model.getContactSourcesStats(range).subscribe((contactSourcesStats: Stat[][]) => {
            this.model.loadContactSourcesStatsData(contactSourcesStats);
            StatsLeadsPlugin.drawChartContactSources(this.model.contactSourcesStatsData);
            //this.model.loadActiveChannelsData(contactSourcesStats);
        });
    }

}
