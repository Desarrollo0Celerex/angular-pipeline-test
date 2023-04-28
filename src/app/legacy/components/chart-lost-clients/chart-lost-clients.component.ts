import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { StatRangeData } from '@interfaces/stat-range-data.interface';

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
    @Input() range: ComparisonRangeData | null = null;

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

    private _loadLostClientsStats(range: ComparisonRangeData): void {
        this.model.getLostClientsStats(range).subscribe((lostClientsStats: StatRangeData[][]) => {
            this.model.loadLostClientsStatsData(lostClientsStats);
            StatsClientsPlugin.drawChartLostClients(this.model.lostClientsStatsData);
        });
    }

}
