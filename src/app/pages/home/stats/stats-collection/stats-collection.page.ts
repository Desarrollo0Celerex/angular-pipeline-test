import { Component } from '@angular/core';

import { UtilitiesHelper } from '@helpers/utilities.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';

@Component({
  selector: 'agt-stats-collection',
  templateUrl: './stats-collection.page.html',
  styles: [
  ]
})
export class StatsCollectionPage {
    range: RangeData | null = null;

    loadContent(statsPeriodData: StatsPeriodData): void {
        this.range = UtilitiesHelper.generateRange(statsPeriodData);
    }
}
