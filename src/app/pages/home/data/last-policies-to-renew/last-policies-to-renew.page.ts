import { Component, OnInit } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';

import * as moment from 'moment';

@Component({
  selector: 'agt-last-policies-to-renew',
  templateUrl: './last-policies-to-renew.page.html',
  styles: [
  ]
})
export class LastPoliciesToRenewPage implements OnInit {
    CONTENT_TYPES: any = CONTENT_TYPES;
    pageUrl: string = '/' + ROUTES_NAME.listClients;
    rangeField: string = 'validityEndDate';
    statsPeriodData: StatsPeriodData | null = null;

    ngOnInit(): void {
        this._catchPeriodData();
    }

    loadContent(statsPeriodData: StatsPeriodData): void {
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
                startDate: moment().subtract(60, 'days').format('DD/MM/YYYY'),
                endDate: moment().add(30, 'days').format('DD/MM/YYYY'),
                periodId: 0
            }
        }
    }
}
