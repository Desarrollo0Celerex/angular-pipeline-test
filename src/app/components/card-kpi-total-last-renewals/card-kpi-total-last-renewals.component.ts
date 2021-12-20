import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { CardKpiTotalLastRenewalsService } from './card-kpi-total-last-renewals.service';

@Component({
  selector: 'agt-card-kpi-total-last-renewals',
  templateUrl: './card-kpi-total-last-renewals.component.html',
  styles: [
  ],
  providers: [CardKpiTotalLastRenewalsService]
})
export class CardKpiTotalLastRenewalsComponent implements OnInit {

    constructor(
        private _cardKpiRenewalsService: CardKpiTotalLastRenewalsService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.model.loadTotalRenewals();
    }

    get model(): CardKpiTotalLastRenewalsService {
        return this._cardKpiRenewalsService;
    }

    goToListRenewalsByRange(): void {
        this._router.navigateByUrl(
            ROUTES_NAME.renewals,
            {
                state: {
                    periodData: {
                        startDate: this.model.rangeStart,
                        endDate: this.model.rangeEnd
                    }
                }
            }
        );
    }

}
