import { Component, OnInit } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';

import { StatsService } from './stats.service';

@Component({
  selector: 'agt-stats',
  templateUrl: './stats.layout.html',
  styles: [
  ],
  providers: [StatsService]
})
export class StatsLayout implements OnInit {
    ROUTES_NAME: any = ROUTES_NAME;

    constructor(private _statsService: StatsService) { }

    ngOnInit(): void {
        this.model.loadTotalActiveLeads();
        this.model.loadLatestTotalActiveLeads();
        this.model.loadTotalActiveClients();
        this.model.loadLatestTotalActiveClients();
        this.model.loadTotalActivePayments();
        this.model.loadLatestTotalActivePayments();
        this.model.loadTotalActiveSinisters();
        this.model.loadLatestTotalActiveSinisters();
    }

    get model(): StatsService {
        return this._statsService;
    }

}
