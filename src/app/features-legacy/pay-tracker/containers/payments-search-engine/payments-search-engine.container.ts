import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { PayTrackerService } from '@features-legacy/pay-tracker/services/pay-tracker/pay-tracker.service';

@Component({
    selector: 'agt-payments-search-engine',
    templateUrl: './payments-search-engine.container.html',
    styles: [],
})
export class PaymentsSearchEngineContainer
    extends SmartComponent
    implements OnInit
{
    query: string = '';
    totalResults: number | undefined = undefined;

    constructor(private _payTrackerService: PayTrackerService) {
        super();
    }

    ngOnInit(): void {
        this._payTrackerService.query
            .pipe(this.takeOne())
            .subscribe((query: string) => {
                this.query = query;
            });
        this._payTrackerService.totalResults
            .pipe(this.untilComponentDestroy())
            .subscribe((totalResults: number) => {
                this.totalResults = totalResults;
            });
    }

    searchPayments(query: string): void {
        this._payTrackerService.setQuery(query);
    }
}
