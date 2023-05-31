import { Pipe, PipeTransform } from '@angular/core';

import { PAYMENT_STATUS } from '@core/constants/settings';

@Pipe({
    name: 'paymentStatusIcon',
})
export class PaymentStatusIconPipe implements PipeTransform {
    transform(paymentStatusId?: number): string {
        let name: string;
        switch (paymentStatusId) {
            case PAYMENT_STATUS.IN_TRANSIT:
                name = 'mdi-alarm-check';
                break;
            case PAYMENT_STATUS.IN_TIME:
                name = 'mdi-alarm';
                break;
            case PAYMENT_STATUS.LATE:
                name = 'mdi-update';
                break;
            case PAYMENT_STATUS.OVERDUE:
                name = 'mdi-alert-circle-outline';
                break;
            default:
                name = '';
                break;
        }
        return name;
    }
}
