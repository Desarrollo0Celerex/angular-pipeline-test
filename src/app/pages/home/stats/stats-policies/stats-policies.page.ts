import { Component } from '@angular/core';

import { UtilitiesHelper } from '@helpers/utilities.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';

@Component({
  selector: 'agt-stats-policies',
  templateUrl: './stats-policies.page.html',
  styles: [
  ]
})
export class StatsPoliciesPage {
    range: RangeData | null = null;

    loadContent(statsPeriodData: StatsPeriodData): void {
        this.range = UtilitiesHelper.generateRange(statsPeriodData);
    }
}
