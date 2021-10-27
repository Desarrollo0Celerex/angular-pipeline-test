import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { RangeData } from '@interfaces/range-data.interface';
import { RangeStat } from '@interfaces/range-stat.interface';

import { ChartLostClientsService } from './chart-lost-clients.service';

declare var StatsClientsPlugin: any;

@Component({
  selector: 'agt-chart-lost-clients',
  templateUrl: './chart-lost-clients.component.html',
  styles: [
  ],
  providers: [ChartLostClientsService]
})
export class ChartLostClientsComponent implements OnChanges {
    @Input() range: RangeData | null = null;

    constructor(private _chartLostClientsService: ChartLostClientsService) { }

    ngOnChanges(changes: SimpleChanges): void {
        StatsClientsPlugin.removeChartLostClients();
        this._loadLostClientsStats(changes.range.currentValue);
    }

    get model(): ChartLostClientsService {
        return this._chartLostClientsService;
    }

    get canShowLostClientsStats(): boolean {
        return (this.model.lostClientsStatsData.length > 0) ? true : false;
    }

    private _loadLostClientsStats(range: RangeData): void {
        this.model.getLostClientsStats(range).subscribe((lostClientsStats: RangeStat[][]) => {
            this.model.loadLostClientsStatsData(lostClientsStats);
            StatsClientsPlugin.drawChartLostClients(this.model.lostClientsStatsData);
        });
    }

}
