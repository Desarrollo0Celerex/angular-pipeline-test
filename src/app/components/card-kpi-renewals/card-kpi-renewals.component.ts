import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { CardKpiRenewalsService } from './card-kpi-renewals.service';

@Component({
  selector: 'agt-card-kpi-renewals',
  templateUrl: './card-kpi-renewals.component.html',
  styles: [
  ],
  providers: [CardKpiRenewalsService]
})
export class CardKpiRenewalsComponent implements OnInit {

    constructor(
        private _cardKpiRenewalsService: CardKpiRenewalsService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.model.loadTotalRenewals();
    }

    get model(): CardKpiRenewalsService {
        return this._cardKpiRenewalsService;
    }

    goToListRenewalsByRange(): void {
        this._router.navigateByUrl(ROUTES_NAME.renewals);
    }

}
