import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PAYMENT_STATUS } from '@configs/constants.config';

@Injectable()
export class PayTrackerService {
    contentSubtype: BehaviorSubject<number> = new BehaviorSubject<number>(
        PAYMENT_STATUS.IN_TRANSIT
    );

    selectContentSubtype(contentSubtype: number): void {
        this.contentSubtype.next(contentSubtype);
    }
}
