import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { CardKpiTotalActiveLeadsService } from './card-kpi-total-active-leads.service';

@Component({
    selector: 'agt-card-kpi-total-active-leads',
    templateUrl: './card-kpi-total-active-leads.component.html',
    styles: [],
    providers: [
        CardKpiTotalActiveLeadsService
    ],
    standalone: false
})
export class CardKpiTotalActiveLeadsComponent implements OnInit {

    constructor(
        private _cardKpiActiveLeadsService: CardKpiTotalActiveLeadsService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.model.loadTotalLeads();
    }

    get model(): CardKpiTotalActiveLeadsService {
        return this._cardKpiActiveLeadsService;
    }

    goToListLeads(): void {
        this._router.navigateByUrl(ROUTES_NAME.listLeads);
    }

}
