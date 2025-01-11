import { Component, OnInit } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';

import { ContainerGlobalKpisService } from './container-global-kpis.service';

@Component({
    selector: 'agt-container-global-kpis',
    templateUrl: './container-global-kpis.component.html',
    styles: [],
    providers: [ContainerGlobalKpisService],
    standalone: false
})
export class ContainerGlobalKpisComponent implements OnInit {
    ROUTES_NAME: any = ROUTES_NAME;

    constructor(private _containerGlobalKpisService: ContainerGlobalKpisService) { }

    ngOnInit(): void {
        this.model.loadTotalActiveLeads();
        this.model.loadLatestTotalActiveLeads();
        this.model.loadTotalActiveClients();
        this.model.loadLatestTotalActiveClients();
        this.model.loadTotalActivePayments();
        this.model.loadLatestTotalActivePayments();
        this.model.loadTotalActiveSinisters();
        this.model.loadLatestTotalActiveSinisters();
    }

    get model(): ContainerGlobalKpisService {
        return this._containerGlobalKpisService;
    }

}
