import { Pipe, PipeTransform } from '@angular/core';

import { PAYMENT_STATUS } from '@core/constants/settings';

@Pipe({
    name: 'paymentStatusName',
})
export class PaymentStatusNamePipe implements PipeTransform {
    transform(paymentStatusId?: number): string {
        let name: string;
        switch (paymentStatusId) {
            case PAYMENT_STATUS.IN_TRANSIT:
                name = 'En Tránsito';
                break;
            case PAYMENT_STATUS.IN_TIME:
                name = 'En Tiempo';
                break;
            case PAYMENT_STATUS.LATE:
                name = 'Atrasado';
                break;
            case PAYMENT_STATUS.OVERDUE:
                name = 'Vencido';
                break;
            case PAYMENT_STATUS.PAID:
                name = 'Pagado';
                break;
            case PAYMENT_STATUS.STANDBY:
                name = 'En espera';
                break;
            default:
                name = '';
                break;
        }
        return name;
    }
}
