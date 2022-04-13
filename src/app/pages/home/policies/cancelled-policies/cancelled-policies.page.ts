import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';

import * as moment from 'moment';

@Component({
  selector: 'agt-cancelled-policies',
  templateUrl: './cancelled-policies.page.html',
  styles: [
  ]
})
export class CancelledPoliciesPage implements OnInit {
    CONTENT_TYPES: any = CONTENT_TYPES;
    pageUrl: string = '/' + ROUTES_NAME.listClients;
    rangeField: string = 'updatedAt';
    statsPeriodData: StatsPeriodData | null = null;
    specialFilter: string = '';
    private subParams: any;
    private rangeStart: string = '';
    private rangeEnd: string = '';

    constructor(private _activatedRoute: ActivatedRoute){ }

    ngOnInit(): void {
        this.catchParams();
        this._catchPeriodData();
    }

    ngOnDestroy(): void {
        if(!!this.subParams) this.subParams.unsubscribe();
    }

    applySpecialFilter(specialFilter: string): void {
        this.specialFilter = specialFilter;
    }

    loadContent(statsPeriodData: StatsPeriodData): void {
        this.statsPeriodData = statsPeriodData;
    }

    private catchParams(): void {
        this.subParams = this._activatedRoute.queryParams.subscribe( (params: Params) => {
            this.rangeStart = params['rangeStart'];
            this.rangeEnd = params['rangeEnd'];
        })
    }

    private _catchPeriodData(): void {
        // If there is saved data
        if(!!history.state.periodData) {
            this.statsPeriodData = {
                startDate: history.state.periodData.startDate,
                endDate: history.state.periodData.endDate,
                periodId: 0
            }
        } else if(!!this.rangeStart && !!this.rangeEnd) {
            this.statsPeriodData = {
                startDate: moment(this.rangeStart, 'DD-MM-YYYY').format('DD/MM/YYYY'),
                endDate: moment(this.rangeEnd, 'DD-MM-YYYY').format('DD/MM/YYYY'),
                periodId: 0
            }
        } else {
            // Else, set default data.
            this.statsPeriodData = {
                startDate: moment().subtract(90, 'days').format('DD/MM/YYYY'),
                endDate: moment().format('DD/MM/YYYY'),
                periodId: 0
            }
        }
    }
}
