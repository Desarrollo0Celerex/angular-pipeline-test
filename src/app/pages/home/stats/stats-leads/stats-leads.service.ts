import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { PERIODS } from '@constants/global';
import { RangeData } from '@interfaces/range-data.interface';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';

@Injectable()
export class StatsLeadsService {
    range: RangeData | null = null;

    generatePeriods(statsPeriodData: StatsPeriodData): void {
        const startDateAux: any = moment(statsPeriodData.startDate, 'DD/MM/YYYY');
        const endDateAux: any = moment(statsPeriodData.endDate, 'DD/MM/YYYY');
        const comparedPeriodRangeStart: string = ((statsPeriodData.periodId == PERIODS.LAST_YEAR) ? startDateAux.subtract(1, 'years') : startDateAux.subtract(1, 'months')).format('DD/MM/YYYY');
        const comparedPeriodRangeEnd: string = ((statsPeriodData.periodId == PERIODS.LAST_YEAR) ?  endDateAux.subtract(1, 'years') : endDateAux.subtract(1, 'months')).format('DD/MM/YYYY');
        this.range = {
            selectedRangeStart: statsPeriodData.startDate,
            selectedRangeEnd: statsPeriodData.endDate,
            comparedRangeStart: comparedPeriodRangeStart,
            comparedRangeEnd: comparedPeriodRangeEnd
        }
    }

}
