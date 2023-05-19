import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { CONTENT_TYPES } from '@constants/global';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';

@Component({
  selector: 'agt-workspace-quotations-opened-by-range',
  templateUrl: './workspace-quotations-opened-by-range.page.html',
  styles: [
  ]
})
export class WorkspaceQuotationsOpenedByRangePage implements OnInit {
    CONTENT_TYPES: any = CONTENT_TYPES;
    rangeField: string = 'createdAt';
    statsPeriodData: StatsPeriodData | null = null;
    specialFilter: string = '';

    constructor(private _activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.statsPeriodData = this._generatePeriodData();
    }

    applySpecialFilter(specialFilter: string): void {
        this.specialFilter = specialFilter;
    }

    loadContent(statsPeriodData: StatsPeriodData): void {
        this.specialFilter = '';
        this.statsPeriodData = statsPeriodData;
    }

    private _generatePeriodData(): StatsPeriodData {
        const startDate: string = this._activatedRoute.snapshot.queryParamMap.get('rangeStart') || moment().subtract(30, 'days').format('DD/MM/YYYY');
        const endDate: string = this._activatedRoute.snapshot.queryParamMap.get('rangeEnd') || moment().format('DD/MM/YYYY');
        return {
            startDate,
            endDate,
            periodId: 0
        }
    }
}
