import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PAYMENT_STATUS } from '@configs/constants.config';

@Injectable()
export class PayTrackerService {
    paymentStatusId: BehaviorSubject<number> = new BehaviorSubject<number>(
        PAYMENT_STATUS.IN_TRANSIT
    );

    setPaymentStatusId(paymentStatusId: number): void {
        this.paymentStatusId.next(paymentStatusId);
    }
}
