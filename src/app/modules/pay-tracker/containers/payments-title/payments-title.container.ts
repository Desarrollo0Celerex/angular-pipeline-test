import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { PayTrackerService } from '@modules/pay-tracker/services/pay-tracker/pay-tracker.service';

@Component({
    selector: 'agt-payments-title',
    templateUrl: './payments-title.container.html',
    styles: [],
})
export class PaymentsTitleContainer extends SmartComponent implements OnInit {
    paymentStatusId: number = 0;

    constructor(private _payTrackerService: PayTrackerService) {
        super();
    }

    ngOnInit(): void {
        this._payTrackerService.paymentStatusId
            .pipe(this.untilComponentDestroy())
            .subscribe((paymentStatusId) => {
                this.paymentStatusId = paymentStatusId;
            });
    }
}
