import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { CardKpiTotalActiveClientsService } from './card-kpi-total-active-clients.service';

@Component({
    selector: 'agt-card-kpi-total-active-clients',
    templateUrl: './card-kpi-total-active-clients.component.html',
    styles: [],
    providers: [CardKpiTotalActiveClientsService],
    standalone: false
})
export class CardKpiTotalActiveClientsComponent implements OnInit {

    constructor(
        private _cardKpiActiveclientsService: CardKpiTotalActiveClientsService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.model.loadTotalActiveClients();
    }

    get model(): CardKpiTotalActiveClientsService {
        return this._cardKpiActiveclientsService;
    }

    goToListClients(): void {
        this._router.navigateByUrl(ROUTES_NAME.listClients);
    }
}
