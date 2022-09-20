import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';

import * as moment from 'moment';

@Component({
  selector: 'agt-list-pending-payments-by-range',
  templateUrl: './list-pending-payments-by-range.page.html',
  styles: [
  ]
})
export class ListPendingPaymentsByRangePage implements OnInit {
    CONTENT_TYPES: any = CONTENT_TYPES;
    pageUrl: string = '/' + ROUTES_NAME.listPayments;
    rangeField: string = 'paymentDate';
    statsPeriodData: StatsPeriodData | null = null;
    specialFilter: string = '';
    private rangeStart: string = '';
    private rangeEnd: string = '';

    constructor(private _activatedRoute: ActivatedRoute){ }

    ngOnInit(): void {
        this.catchParams();
        this._catchPeriodData();
    }

    applySpecialFilter(specialFilter: string): void {
        this.specialFilter = specialFilter;
    }

    loadContent(statsPeriodData: StatsPeriodData): void {
        this.specialFilter = '';
        this.statsPeriodData = statsPeriodData;
    }

    private catchParams(): void {
        this.rangeStart = this._activatedRoute.snapshot.params.rangeStart || '';
        this.rangeEnd = this._activatedRoute.snapshot.params.rangeEnd || '';
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
                startDate: moment().subtract(1, 'month').format('DD/MM/YYYY'),
                endDate: moment().add(1, 'month').format('DD/MM/YYYY'),
                periodId: 0
            }
        }
    }
}
