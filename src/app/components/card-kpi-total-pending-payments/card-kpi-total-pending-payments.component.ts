import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { CardKpiTotalPendingPaymentsService } from './card-kpi-total-pending-payments.service';

@Component({
  selector: 'agt-card-kpi-total-pending-payments',
  templateUrl: './card-kpi-total-pending-payments.component.html',
  styles: [
  ],
  providers: [CardKpiTotalPendingPaymentsService]
})
export class CardKpiTotalPendingPaymentsComponent implements OnInit {

    constructor(
        private _cardKpiTotalPendingPaymentsService: CardKpiTotalPendingPaymentsService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.model.loadTotalPendingReceipts();
    }

    get model(): CardKpiTotalPendingPaymentsService {
        return this._cardKpiTotalPendingPaymentsService;
    }

    goToListPendingPaymentsByRange(): void {
        this._router.navigateByUrl(ROUTES_NAME.listPendingPaymentsByRange);
    }

}
