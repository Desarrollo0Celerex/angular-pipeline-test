import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';

import moment from 'moment';

@Component({
    selector: 'agt-insurance-sinisters-by-range',
    templateUrl: './insurance-sinisters-by-range.page.html',
    styles: [],
})
export class InsuranceSinistersByRangePage implements OnInit {
    CONTENT_TYPES: any = CONTENT_TYPES;
    insuranceId: number = 0;
    rangeField: string = 'sinisterDate';
    statsPeriodData: StatsPeriodData | null = null;
    specialFilter: string = '';

    constructor(private _router: Router) {}

    ngOnInit(): void {
        this._catchPeriodData();
    }

    applySpecialFilter(specialFilter: string): void {
        this.specialFilter = specialFilter;
    }

    loadContent(statsPeriodData: StatsPeriodData): void {
        this.specialFilter = '';
        this.statsPeriodData = statsPeriodData;
    }

    private _catchPeriodData(): void {
        // If there is saved data
        if (!!history.state.periodData && !!history.state.insuranceId) {
            this.statsPeriodData = {
                startDate: history.state.periodData.startDate,
                endDate: history.state.periodData.endDate,
                periodId: 0,
            };
            this.insuranceId = history.state.insuranceId;
        } else {
            // TEMP
            this.statsPeriodData = {
                startDate: moment().subtract(3, 'month').format('DD/MM/YYYY'),
                endDate: moment().format('DD/MM/YYYY'),
                periodId: 0,
            };
            this.insuranceId = 6;
            // END TEMP

            // TODO: Crear página "sinisters-by-range" y navegar a ella
            //this._router.navigateByUrl(ROUTES_NAME.listSinisters);
        }
    }
}
