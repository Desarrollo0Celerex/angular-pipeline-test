import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { INSURANCES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';

@Component({
    selector: 'agt-stats-sinisters',
    templateUrl: './stats-sinisters.page.html',
    styles: [],
})
export class StatsSinistersPage {
    INSURANCES: any = INSURANCES;
    range: ComparisonRangeData | null = null;
    statsPeriodData: StatsPeriodData | null = null;

    constructor(private _router: Router) {}

    loadContent(statsPeriodData: StatsPeriodData): void {
        this.statsPeriodData = statsPeriodData;
        this.range = UtilitiesHelper.generateRange(statsPeriodData);
    }

    goToSinisterListByRange(insuranceId: number): void {
        this._router.navigateByUrl(ROUTES_NAME.insuranceSinistersByRange, {
            state: {
                periodData: {
                    startDate: this.range!.selectedRangeStart,
                    endDate: this.range!.selectedRangeEnd,
                },
                insuranceId,
            },
        });
    }
}
