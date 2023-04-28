import { Component } from '@angular/core';

import { CONTENT_TYPES, DEFAULT_CONTENT_FILTER_ID } from '@constants/global';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';

@Component({
  selector: 'agt-list-external-policies',
  templateUrl: './list-external-policies.page.html',
  styles: [
  ]
})
export class ListExternalPoliciesPage {
    CONTENT_TYPES: any = CONTENT_TYPES;
    DEFAULT_CONTENT_FILTER_ID: any = DEFAULT_CONTENT_FILTER_ID;
    statsPeriodData: StatsPeriodData | null = null;
    specialFilter: string = '';

    applySpecialFilter(specialFilter: string): void {
        this.specialFilter = specialFilter;
    }
}
