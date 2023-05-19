import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PAY_TRACKER_ROUTES } from '@configs/routes.config';
import { PayTrackerService } from '@modules/pay-tracker/services/pay-tracker/pay-tracker.service';

@Component({
    selector: 'agt-search-engine',
    templateUrl: './search-engine.container.html',
    styles: [],
})
export class SearchEngineContainer {
    constructor(
        private _payTrackerService: PayTrackerService,
        private _router: Router
    ) {}

    goToSearchPayments(query: string): void {
        this._payTrackerService.setQuery(query);
        this._router.navigateByUrl(
            `${PAY_TRACKER_ROUTES.MODULE}/${PAY_TRACKER_ROUTES.SEARCH_RESULTS}`
        );
    }
}
