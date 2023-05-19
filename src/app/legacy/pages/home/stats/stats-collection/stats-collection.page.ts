import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';

@Component({
    selector: 'agt-stats-collection',
    templateUrl: './stats-collection.page.html',
    styles: [],
})
export class StatsCollectionPage {
    range: ComparisonRangeData | null = null;

    constructor(private _router: Router) {}

    loadContent(statsPeriodData: StatsPeriodData): void {
        this.range = UtilitiesHelper.generateRange(statsPeriodData);
    }

    goToPaymentsCalendar(): void {
        this._router.navigateByUrl(ROUTES_NAME.paymentCalendar);
    }

    goToWorkspaceReceiptsPaidByRange(): void {
        if (!!this.range) {
            this._router.navigate([ROUTES_NAME.workspaceReceiptsPaidByRange], {
                queryParams: {
                    rangeStart: this.range.selectedRangeStart,
                    rangeEnd: this.range.selectedRangeEnd,
                },
            });
        }
    }

    goToWorkspaceReceiptsPendingByRange(): void {
        if (!!this.range) {
            this._router.navigate(
                [ROUTES_NAME.workspaceReceiptsPendingByRange],
                {
                    queryParams: {
                        startDate: this.range.selectedRangeStart,
                        endDate: this.range.selectedRangeEnd,
                    },
                }
            );
        }
    }
}
