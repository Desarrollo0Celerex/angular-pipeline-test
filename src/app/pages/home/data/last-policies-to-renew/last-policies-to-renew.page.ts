import { Component, OnInit } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';
import { LoadingService } from '@services/loading.service';

import { LastPoliciesToRenewService } from './last-policies-to-renew.service';

import * as moment from 'moment';

@Component({
  selector: 'agt-last-policies-to-renew',
  templateUrl: './last-policies-to-renew.page.html',
  styles: [
  ],
  providers: [LastPoliciesToRenewService]
})
export class LastPoliciesToRenewPage implements OnInit {
    CONTENT_TYPES: any = CONTENT_TYPES;
    pageUrl: string = '/' + ROUTES_NAME.listClients;
    rangeField: string = 'validityEndDate';
    statsPeriodData: StatsPeriodData | null = null;

    constructor(
        private _lastPoliciesToRenewService: LastPoliciesToRenewService,
        private _loadingService: LoadingService
    ) { }

    ngOnInit(): void {
        this._catchPeriodData();
    }

    get model(): LastPoliciesToRenewService {
        return this._lastPoliciesToRenewService;
    }

    downloadRenewalsReport(): void {
        if(!!this.statsPeriodData) {
            this._loadingService.show();
            this.model.downloadRenewalsReport(this.rangeField, this.statsPeriodData.startDate, this.statsPeriodData.endDate).then(() => {
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
                startDate: moment().subtract(60, 'days').format('DD/MM/YYYY'),
                endDate: moment().add(30, 'days').format('DD/MM/YYYY'),
                periodId: 0
            }
        }
    }
}
