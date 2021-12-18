import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { CardKpiActiveClientsService } from './card-kpi-active-clients.service';

@Component({
  selector: 'agt-card-kpi-active-clients',
  templateUrl: './card-kpi-active-clients.component.html',
  styles: [
  ],
  providers: [CardKpiActiveClientsService]
})
export class CardKpiActiveClientsComponent implements OnInit {

    constructor(
        private _cardKpiActiveclientsService: CardKpiActiveClientsService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.model.loadTotalActiveClients();
    }

    get model(): CardKpiActiveClientsService {
        return this._cardKpiActiveclientsService;
    }

    goToListClients(): void {
        this._router.navigateByUrl(ROUTES_NAME.listClients);
    }
}
