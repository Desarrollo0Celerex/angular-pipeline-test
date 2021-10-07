import { Component } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';

import { StatsLeadsService } from './stats-leads.service';

@Component({
  selector: 'agt-stats-leads',
  templateUrl: './stats-leads.page.html',
  styles: [
  ],
  providers: [StatsLeadsService]
})
export class StatsLeadsPage {
    ROUTES_NAME: any = ROUTES_NAME;

    constructor(private _statsLeadsService: StatsLeadsService) { }

    get model(): StatsLeadsService {
        return this._statsLeadsService;
    }

    loadContent(statsPeriodData: StatsPeriodData): void {
        this.model.generatePeriods(statsPeriodData);
    }
}
