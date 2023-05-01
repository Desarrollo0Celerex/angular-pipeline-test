import { Component } from '@angular/core';
import { CONTENT_TYPES } from '@configs/constants.config';
import { SmartComponent } from '@core/classes/smart-component';
import { PayTrackerService } from '@modules/pay-tracker/services/pay-tracker/pay-tracker.service';

@Component({
    selector: 'agt-payment-list',
    templateUrl: './payment-list.page.html',
    styles: [],
})
export class PaymentListPage extends SmartComponent {
    contentType: number = CONTENT_TYPES.PAYMENTS;
    contentSubtype: number = 0;

    constructor(private _payTrackerService: PayTrackerService) {
        super();
        this._payTrackerService.contentSubtype
            .pipe(this.untilComponentDestroy())
            .subscribe((contentSubtype) => {
                this.contentSubtype = contentSubtype;
            });
    }
}
