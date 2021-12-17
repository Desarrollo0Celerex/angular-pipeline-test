import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { CardKpiQuotesService } from './card-kpi-quotes.service'

@Component({
  selector: 'agt-card-kpi-quotes',
  templateUrl: './card-kpi-quotes.component.html',
  styles: [
  ],
  providers: [CardKpiQuotesService]
})
export class CardKpiQuotesComponent implements OnInit {
    @Output() quoteInsuranceRequested: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private _cardQuotesKpiService: CardKpiQuotesService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.model.loadTotalQuotations();
    }

    get model(): CardKpiQuotesService {
        return this._cardQuotesKpiService;
    }

    quoteInsurance(): void {
        this.quoteInsuranceRequested.emit();
    }

    goToListQuotationsByRange(): void {
        this._router.navigateByUrl(ROUTES_NAME.listQuotationsByRange)
    }

}
