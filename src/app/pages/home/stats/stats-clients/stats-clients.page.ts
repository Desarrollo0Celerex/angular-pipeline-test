import { Component } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';

@Component({
  selector: 'agt-stats-clients',
  templateUrl: './stats-clients.page.html',
  styles: [
  ]
})
export class StatsClientsPage {
    ROUTES_NAME: any = ROUTES_NAME;
    range: RangeData | null = null;

    loadContent(statsPeriodData: StatsPeriodData): void {
        this.range = UtilitiesHelper.generateRange(statsPeriodData);
    }
}
