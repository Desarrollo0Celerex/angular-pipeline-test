import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
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

    constructor(private _router: Router) { }

    loadContent(statsPeriodData: StatsPeriodData): void {
        this.range = UtilitiesHelper.generateRange(statsPeriodData);
    }

    goToPoliciesToRenew(): void {
        if(!!this.range) {
            this._router.navigateByUrl(
                ROUTES_NAME.lastPoliciesToRenew,
                {
                    state: {
                        periodData: {
                            startDate: this.range.selectedRangeStart,
                            endDate: this.range.selectedRangeEnd
                        }
                    }
                }
            );
        }

    }

    goToCancelledPolicies(): void {
        if(!!this.range) {
            this._router.navigateByUrl(
                ROUTES_NAME.lastCancelledPolicies,
                {
                    state: {
                        periodData: {
                            startDate: this.range.selectedRangeStart,
                            endDate: this.range.selectedRangeEnd
                        }
                    }
                }
            );
        }

    }
}
