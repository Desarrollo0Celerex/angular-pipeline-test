import { Component } from '@angular/core';
import { CONTENT_TYPES } from '@configs/constants.config';
import { SmartComponent } from '@core/classes/smart-component';
import { PayTrackerService } from '@modules/pay-tracker/services/pay-tracker/pay-tracker.service';

@Component({
    selector: 'agt-payments',
    templateUrl: './payments.page.html',
    styles: [],
})
export class PaymentsPage extends SmartComponent {
    contentType: number = CONTENT_TYPES.PAYMENTS;
    paymentStatusId: number = 0;

    constructor(private _payTrackerService: PayTrackerService) {
        super();
        this._payTrackerService.paymentStatusId
            .pipe(this.untilComponentDestroy())
            .subscribe((paymentStatusId) => {
                this.paymentStatusId = paymentStatusId;
            });
    }
}
