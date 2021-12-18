import { Component, OnInit } from '@angular/core';

import { CardKpiTotalPendingPaymentsService } from './card-kpi-total-pending-payments.service';

@Component({
  selector: 'agt-card-kpi-total-pending-payments',
  templateUrl: './card-kpi-total-pending-payments.component.html',
  styles: [
  ],
  providers: [CardKpiTotalPendingPaymentsService]
})
export class CardKpiTotalPendingPaymentsComponent implements OnInit {

    constructor(private _cardKpiTotalPendingPaymentsService: CardKpiTotalPendingPaymentsService) { }

    ngOnInit(): void {
        this.model.loadTotalPendingReceipts();
    }

    get model(): CardKpiTotalPendingPaymentsService {
        return this._cardKpiTotalPendingPaymentsService;
    }

    goToListPendingPaymentsByRange(): void {
        
    }

}
