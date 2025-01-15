import { Component } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';

@Component({
    selector: 'agt-stats-clients',
    templateUrl: './stats-clients.page.html',
    styles: [],
    standalone: false
})
export class StatsClientsPage {
    ROUTES_NAME: any = ROUTES_NAME;
    range: ComparisonRangeData | null = null;

    loadContent(statsPeriodData: StatsPeriodData): void {
        this.range = UtilitiesHelper.generateRange(statsPeriodData);
    }
}
