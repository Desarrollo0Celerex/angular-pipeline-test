import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PAYMENT_STATUS } from '@configs/constants.config';

@Injectable()
export class PayTrackerService {
    paymentStatusId: BehaviorSubject<number> = new BehaviorSubject<number>(
        PAYMENT_STATUS.IN_TRANSIT
    );
    query: BehaviorSubject<string> = new BehaviorSubject<string>('');
    totalResults: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
    canReloadContent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );

    reloadContent(): void {
        this.canReloadContent.next(true);
    }

    setPaymentStatusId(paymentStatusId: number): void {
        this.paymentStatusId.next(paymentStatusId);
    }

    setQuery(query: string): void {
        this.query.next(query);
    }

    setTotalResults(totalResults: number): void {
        this.totalResults.next(totalResults);
    }
}
