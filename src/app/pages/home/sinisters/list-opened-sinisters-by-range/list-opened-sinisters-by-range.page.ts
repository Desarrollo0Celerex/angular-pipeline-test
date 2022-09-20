import { Component, OnInit } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';

import * as moment from 'moment';

@Component({
  selector: 'agt-list-opened-sinisters-by-range',
  templateUrl: './list-opened-sinisters-by-range.page.html',
  styles: [
  ]
})
export class ListOpenedSinistersByRangePage implements OnInit {
    CONTENT_TYPES: any = CONTENT_TYPES;
    rangeField: string = 'sinisterDate';
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
                startDate: moment().subtract(3, 'month').format('DD/MM/YYYY'),
                endDate: moment().format('DD/MM/YYYY'),
                periodId: 0
            }
        }
    }

}
