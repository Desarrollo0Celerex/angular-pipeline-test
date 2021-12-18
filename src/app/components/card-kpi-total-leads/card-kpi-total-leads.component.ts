import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { CardKpiTotalLeadsService } from './card-kpi-total-leads.service';

@Component({
  selector: 'agt-card-kpi-total-leads',
  templateUrl: './card-kpi-total-leads.component.html',
  styles: [
  ],
  providers: [
      CardKpiTotalLeadsService
  ]
})
export class CardKpiTotalLeadsComponent implements OnInit {

    constructor(
        private _cardKpiActiveLeadsService: CardKpiTotalLeadsService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.model.loadTotalLeads();
    }

    get model(): CardKpiTotalLeadsService {
        return this._cardKpiActiveLeadsService;
    }

    goToListLeads(): void {
        this._router.navigateByUrl(ROUTES_NAME.listLeads);
    }

}
