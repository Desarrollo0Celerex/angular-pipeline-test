import { Component } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';

@Component({
  selector: 'agt-stats-leads',
  templateUrl: './stats-leads.page.html',
  styles: [
  ]
})
export class StatsLeadsPage {
    ROUTES_NAME: any = ROUTES_NAME;
    range: ComparisonRangeData | null = null;

    loadContent(statsPeriodData: StatsPeriodData): void {
        this.range = UtilitiesHelper.generateRange(statsPeriodData);
    }
}
