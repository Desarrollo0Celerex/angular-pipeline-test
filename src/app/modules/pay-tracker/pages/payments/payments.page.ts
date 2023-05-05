import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { PayTrackerService } from '@modules/pay-tracker/services/pay-tracker/pay-tracker.service';

@Component({
    selector: 'agt-payments',
    templateUrl: './payments.page.html',
    styles: [],
})
export class PaymentsPage extends SmartComponent implements OnInit {
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

    searchContent(query: string): void {
        console.log('Buscar contenido: ', query);
    }
}
