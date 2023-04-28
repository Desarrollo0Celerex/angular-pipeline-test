import { Component, OnInit } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';

import * as moment from 'moment';

@Component({
  selector: 'agt-list-active-policies-by-range',
  templateUrl: './list-active-policies-by-range.page.html',
  styles: [
  ]
})
export class ListActivePoliciesByRangePage implements OnInit {
    CONTENT_TYPES: any = CONTENT_TYPES;
    pageUrl: string = '/' + ROUTES_NAME.listLeads;
    rangeField: string = 'validityStartDate';
    statsPeriodData: StatsPeriodData | null = null;
    specialFilter: string = '';

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
        if(!!history.state.periodData) {
            this.statsPeriodData = {
                startDate: history.state.periodData.startDate,
                endDate: history.state.periodData.endDate,
                periodId: 0
            }
        } else {
            // Else, set default data.
            this.statsPeriodData = {
                startDate: moment().subtract(1, 'month').format('DD/MM/YYYY'),
                endDate: moment().add(1, 'month').format('DD/MM/YYYY'),
                periodId: 0
            }
        }
    }
}
