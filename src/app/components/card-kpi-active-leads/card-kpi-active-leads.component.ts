import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { CardKpiActiveLeadsService } from './card-kpi-active-leads.service';

@Component({
  selector: 'agt-card-kpi-active-leads',
  templateUrl: './card-kpi-active-leads.component.html',
  styles: [
  ],
  providers: [
      CardKpiActiveLeadsService
  ]
})
export class CardKpiActiveLeadsComponent implements OnInit {

    constructor(
        private _cardKpiActiveLeadsService: CardKpiActiveLeadsService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.model.loadTotalActiveLeads();
    }

    get model(): CardKpiActiveLeadsService {
        return this._cardKpiActiveLeadsService;
    }

    goToListLeads(): void {
        this._router.navigateByUrl(ROUTES_NAME.listLeads);
    }

}
