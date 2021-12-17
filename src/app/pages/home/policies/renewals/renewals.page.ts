import { Component, OnInit } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';
import { LoadingService } from '@services/loading.service';

import { RenewalsService } from './renewals.service';

import * as moment from 'moment';

@Component({
  selector: 'agt-renewals',
  templateUrl: './renewals.page.html',
  styles: [
  ],
  providers: [RenewalsService]
})
export class RenewalsPage implements OnInit {
    CONTENT_TYPES: any = CONTENT_TYPES;
    pageUrl: string = '/' + ROUTES_NAME.listClients;
    rangeField: string = 'validityEndDate';
    statsPeriodData: StatsPeriodData | null = null;

    constructor(
        private _renewalsService: RenewalsService,
        private _loadingService: LoadingService
    ) { }

    ngOnInit(): void {
        this._catchPeriodData();
    }

    get model(): RenewalsService {
        return this._renewalsService;
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
