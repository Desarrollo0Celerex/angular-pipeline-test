import { Component, OnInit } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';
import { LoadingService } from '@services/loading.service';

import { ListActivePoliciesByRangeService } from './list-active-policies-by-range.service';

import * as moment from 'moment';

@Component({
  selector: 'agt-list-active-policies-by-range',
  templateUrl: './list-active-policies-by-range.page.html',
  styles: [
  ],
  providers: [ListActivePoliciesByRangeService]
})
export class ListActivePoliciesByRangePage implements OnInit {
    CONTENT_TYPES: any = CONTENT_TYPES;
    pageUrl: string = '/' + ROUTES_NAME.listLeads;
    rangeField: string = 'validityEndDate';
    statsPeriodData: StatsPeriodData | null = null;

    constructor(
        private _model: ListActivePoliciesByRangeService,
        private _loadingService: LoadingService
    ) { }

    ngOnInit(): void {
        this._catchPeriodData();
    }

    downloadActivePoliciesReport(): void {
        if(!!this.statsPeriodData) {
            this._loadingService.show();
            this._model.downloadActivePoliciesReport(this.rangeField, this.statsPeriodData.startDate, this.statsPeriodData.endDate).then(() => {
                this._loadingService.hide();
            });
        }
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
                startDate: moment().subtract(3, 'month').format('DD/MM/YYYY'),
                endDate: moment().format('DD/MM/YYYY'),
                periodId: 0
            }
        }
    }
}
