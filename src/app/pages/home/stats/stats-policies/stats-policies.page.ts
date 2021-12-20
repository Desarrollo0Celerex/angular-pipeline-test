import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';
import { LoadingService } from '@services/loading.service';

import { StatsPoliciesService } from './stats-policies.service';

@Component({
  selector: 'agt-stats-policies',
  templateUrl: './stats-policies.page.html',
  styles: [
  ],
  providers: [StatsPoliciesService]
})
export class StatsPoliciesPage {
    range: RangeData | null = null;

    constructor(
        private _loadingService: LoadingService,
        private _statsPoliciesService: StatsPoliciesService,
        private _router: Router
    ) { }

    get model(): StatsPoliciesService {
        return this._statsPoliciesService;
    }

    loadContent(statsPeriodData: StatsPeriodData): void {
        this.range = UtilitiesHelper.generateRange(statsPeriodData);
    }

    /*downloadReport(): void {
        this._loadingService.show();
        this.model.downloadPoliciesStatsPdf().then(() => {
            this._loadingService.hide();
        });
    }*/

    goToPoliciesToRenew(): void {
        if(!!this.range) {
            this._router.navigateByUrl(
                ROUTES_NAME.renewals,
                {
                    state: {
                        periodData: {
                            startDate: this.range.selectedRangeStart,
                            endDate: this.range.selectedRangeEnd
                        }
                    }
                }
            );
        }

    }

    goToCancelledPolicies(): void {
        if(!!this.range) {
            this._router.navigateByUrl(
                ROUTES_NAME.cancelledPolicies,
                {
                    state: {
                        periodData: {
                            startDate: this.range.selectedRangeStart,
                            endDate: this.range.selectedRangeEnd
                        }
                    }
                }
            );
        }

    }
}
