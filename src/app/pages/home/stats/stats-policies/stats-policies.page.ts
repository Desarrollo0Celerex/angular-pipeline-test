import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';

@Component({
  selector: 'agt-stats-policies',
  templateUrl: './stats-policies.page.html',
  styles: [
  ]
})
export class StatsPoliciesPage {
    range: ComparisonRangeData | null = null;
    statsPeriodData: StatsPeriodData | null = null;

    constructor(private _router: Router) { }

    loadContent(statsPeriodData: StatsPeriodData): void {
        this.statsPeriodData = statsPeriodData;
        this.range = UtilitiesHelper.generateRange(statsPeriodData);
    }

    goToCancelledPolicies(): void {
        if(!!this.range) {
            this._router.navigate(
                [ROUTES_NAME.workspacePoliciesCanceledByRange],
                {
                    queryParams: {
                        startDate: this.range.selectedRangeStart,
                        endDate: this.range.selectedRangeEnd
                    }
                }
            );
        }
    }

    goToPoliciesToRenew(): void {
        if(!!this.range) {
            this._router.navigate(
                [ROUTES_NAME.workspaceRenewalsPendingByRange],
                {
                    queryParams: {
                        rangeStart: this.range.selectedRangeStart,
                        rangeEnd: this.range.selectedRangeEnd
                    }
                }
            );
        }
    }

    goToRenewedPoliciesByRange(): void {
        if(!!this.range) {
            this._router.navigate([ROUTES_NAME.workspaceRenewalsAppliedByRange],
                {
                    queryParams: {
                        rangeStart: this.range.selectedRangeStart,
                        rangeEnd: this.range.selectedRangeEnd
                    }
                }
            );
        }
    }
}
