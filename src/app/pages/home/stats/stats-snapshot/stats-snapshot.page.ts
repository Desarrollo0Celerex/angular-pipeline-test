import { Component, OnInit } from '@angular/core';

import { InsurerStat } from '@interfaces/insurer-stat.interface';

import { StatsSnapshotService } from './stats-snapshot.service';

declare var StatsPlugin: any;

@Component({
  selector: 'agt-stats-snapshot',
  templateUrl: './stats-snapshot.page.html',
  styles: [
  ],
  providers: [StatsSnapshotService]
})
export class StatsSnapshotPage implements OnInit {

    constructor(private _statsSnapshotService: StatsSnapshotService) { }

    get canShowInsurersStats(): boolean {
        return (this.model.insurersStatsData.length > 1) ? true : false;
    }

    get model(): StatsSnapshotService {
        return this._statsSnapshotService;
    }

    ngOnInit(): void {
        this._loadInsurersStats();
    }

    /**
     * Load the insurers stats
     */
    private _loadInsurersStats(): void {
        this.model.getInsurersStats().subscribe((insurersStats: InsurerStat[]) => {
            this.model.loadInsurersStatsData(insurersStats);
            StatsPlugin.drawInsurerSnapshot(this.model.insurersStatsData);
        })
    }

}
