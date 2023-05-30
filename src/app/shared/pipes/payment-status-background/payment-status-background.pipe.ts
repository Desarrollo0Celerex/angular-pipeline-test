import { Pipe, PipeTransform } from '@angular/core';

import { PAYMENT_STATUS } from '@core/constants/settings';

@Pipe({
    name: 'paymentStatusBackground',
})
export class PaymentStatusBackgroundPipe implements PipeTransform {
    transform(paymentStatusId?: number): string {
        let name: string;
        switch (paymentStatusId) {
            case PAYMENT_STATUS.IN_TRANSIT:
                name = 'success';
                break;
            case PAYMENT_STATUS.IN_TIME:
                name = 'info';
                break;
            case PAYMENT_STATUS.LATE:
                name = 'warning';
                break;
            case PAYMENT_STATUS.OVERDUE:
                name = 'danger';
                break;
            default:
                name = '';
                break;
        }
        return name;
    }
}
