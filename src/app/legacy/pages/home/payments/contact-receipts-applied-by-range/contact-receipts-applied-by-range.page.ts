import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CONTENT_TYPES } from '@constants/global';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';

import moment from 'moment';

@Component({
    selector: 'agt-contact-receipts-applied-by-range',
    templateUrl: './contact-receipts-applied-by-range.page.html',
    styles: [],
})
export class ContactReceiptsAppliedByRangePage implements OnInit {
    CONTENT_TYPES: any = CONTENT_TYPES;
    contactId: string = '';
    rangeField: string = 'paymentDate';
    rangeStart: string = '';
    rangeEnd: string = '';
    statsPeriodData: StatsPeriodData | null = null;

    constructor(private _activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.catchParams();
        this._buildStatsPeriodData();
    }

    loadContent(statsPeriodData: StatsPeriodData): void {
        this.statsPeriodData = statsPeriodData;
    }

    private _buildStatsPeriodData(): void {
        if (!!this.rangeStart && !!this.rangeEnd) {
            this.statsPeriodData = {
                startDate: moment(this.rangeStart, 'DD-MM-YYYY').format(
                    'DD/MM/YYYY'
                ),
                endDate: moment(this.rangeEnd, 'DD-MM-YYYY').format(
                    'DD/MM/YYYY'
                ),
                periodId: 0,
            };
        } else {
            // Else, set default data.
            this.statsPeriodData = {
                startDate: moment().subtract(1, 'month').format('DD/MM/YYYY'),
                endDate: moment().add(1, 'month').format('DD/MM/YYYY'),
                periodId: 0,
            };
        }
    }

    private catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId || '';
        this.rangeStart = this._activatedRoute.snapshot.params.rangeStart || '';
        this.rangeEnd = this._activatedRoute.snapshot.params.rangeEnd || '';
    }
}
