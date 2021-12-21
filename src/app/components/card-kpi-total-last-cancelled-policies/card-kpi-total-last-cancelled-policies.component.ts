import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { CardKpiTotalLastCancelledPoliciesService } from './card-kpi-total-last-cancelled-policies.service';

@Component({
  selector: 'agt-card-kpi-total-last-cancelled-policies',
  templateUrl: './card-kpi-total-last-cancelled-policies.component.html',
  styles: [
  ],
  providers: [
      CardKpiTotalLastCancelledPoliciesService
  ]
})
export class CardKpiTotalLastCancelledPoliciesComponent implements OnInit {

    constructor(
        public cardKpiTotalLastCancelledPoliciesService: CardKpiTotalLastCancelledPoliciesService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.cardKpiTotalLastCancelledPoliciesService.loadTotalLastCancelledPolicies();
    }

    goToListCancelledPoliciesByRange(): void {
        this._router.navigateByUrl(
            ROUTES_NAME.cancelledPolicies,
            {
                state: {
                    periodData: {
                        startDate: this.cardKpiTotalLastCancelledPoliciesService.rangeStart,
                        endDate: this.cardKpiTotalLastCancelledPoliciesService.rangeEnd
                    }
                }
            }
        );
    }

}
