import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { CardKpiTotalQuotesService } from './card-kpi-total-quotes.service'

@Component({
  selector: 'agt-card-kpi-total-quotes',
  templateUrl: './card-kpi-total-quotes.component.html',
  styles: [
  ],
  providers: [CardKpiTotalQuotesService]
})
export class CardKpiTotalQuotesComponent implements OnInit {
    @Output() quoteInsuranceRequested: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private _cardQuotesKpiService: CardKpiTotalQuotesService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.model.loadTotalPendingQuotations();
    }

    get model(): CardKpiTotalQuotesService {
        return this._cardQuotesKpiService;
    }

    quoteInsurance(): void {
        this.quoteInsuranceRequested.emit();
    }

    goToListQuotationsByRange(): void {
        this._router.navigateByUrl(ROUTES_NAME.listQuotationsByRange)
    }

}
