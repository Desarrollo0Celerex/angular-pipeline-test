import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { PAY_TRACKER_ROUTES } from '@core/constants/routes';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';

@Component({
    selector: 'agt-stats-collection',
    templateUrl: './stats-collection.page.html',
    styles: [],
    standalone: false
})
export class StatsCollectionPage {
    range: ComparisonRangeData | null = null;

    constructor(private _router: Router) {}

    loadContent(statsPeriodData: StatsPeriodData): void {
        this.range = UtilitiesHelper.generateRange(statsPeriodData);
    }

    goToPaymentsCalendar(): void {
        this._router.navigateByUrl(
            PAY_TRACKER_ROUTES.MODULE + '/' + PAY_TRACKER_ROUTES.CALENDAR
        );
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
