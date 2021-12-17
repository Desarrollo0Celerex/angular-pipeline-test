import { Component, OnInit } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';

import { DashboardService } from './dashboard.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-dashboard',
  templateUrl: './dashboard.page.html',
  styles: [
  ],
  providers: [DashboardService]
})
export class DashboardPage implements OnInit {
    ROUTES_NAME: any = ROUTES_NAME;
    modalIdSelectContactType: string = 'agt-select-contact-type';

    constructor(private _dashboardService: DashboardService) { }

    ngOnInit(): void {
        //this.model.loadTotalPendingQuotations();
        this.model.loadTotalCurrentPolicies();
        this.model.loadTotalRenewals();
        this.model.loadTotalCancelledPolicies();
    }

    get model(): DashboardService {
        return this._dashboardService;
    }

    showModalToSelectContactType(): void {
        ModalPlugin.show(this.modalIdSelectContactType);
    }

}
